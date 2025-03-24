// Custom Quill Wrapper that extends django_quill's functionality with WebSocket support
(function() {
    // Store the original QuillWrapper constructor
    const OriginalQuillWrapper = djq.QuillWrapper || QuillWrapper;

    // Define our extended QuillWrapper
    class WebSocketQuillWrapper extends OriginalQuillWrapper {
        constructor(targetDivId, targetInputId, quillOptions, websocketOptions = null) {
            // Call the original constructor first
            super(targetDivId, targetInputId, quillOptions);

            // Add WebSocket functionality if options are provided
            if (websocketOptions) {
                this.setupWebSocket(targetDivId, websocketOptions);
            }
        }

        setupWebSocket(targetDivId, options) {
            // Import Y, QuillBinding, etc. from the global scope
            // These need to be loaded before this script runs
            const { Y, QuillBinding, QuillCursors, WebsocketProvider } = window.YjsQuill || {};
            
            if (!Y || !QuillBinding || !WebsocketProvider) {
                console.error('YjsQuill dependencies not found. Make sure to load the editor-bundle.mjs first');
                return;
            }

            // Create a Y.Doc instance
            const ydoc = new Y.Doc();
            
            // Extract options
            const model = options.model || 'default.Model';
            const id = options.id || 1;
            const field = options.field || 'content';
            const wsUrl = options.wsUrl || 'ws://localhost:8000/ws';
            
            // Set up WebSocket provider
            const wsProvider = new WebsocketProvider(
                wsUrl,
                `${model}__${id}`,
                ydoc
            );

            // Set up status logging
            wsProvider.on("status", (event) => {
                console.log(`WebSocket status: ${event.status}`);
            });

            // Register cursors module if not already registered
            if (!Quill.imports['modules/cursors']) {
                Quill.register("modules/cursors", QuillCursors);
            }
            
            // Get the Y.Text type
            const type = ydoc.getText(field);

            // Set up the binding between Quill and Y.js
            this.binding = new QuillBinding(type, this.quill, wsProvider.awareness);
            
            // Store references for potential future use
            this.ydoc = ydoc;
            this.wsProvider = wsProvider;
        }
    }

    // Override the original QuillWrapper
    if (typeof djq !== 'undefined') {
        djq.QuillWrapper = WebSocketQuillWrapper;
    } else {
        window.QuillWrapper = WebSocketQuillWrapper;
    }
})();
