# PyJS Collaborative Editor Project

A project testing collaborative editing with Django, WebSocket, and Yjs on Quill. This README documents the installation, setup, and notes for both client and server configurations.

## Features & TODO
- Implement Redis backend store: copy storage and adapt yjs_consumer from https://github.com/jupyter-server/pycrdt-websocket/pull/25

## Installation and Setup
### Environment Setup
```
python -m venv venv
activate venv
pip install -r requirements.txt
```
### Django Setup
```
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
python manage.py runserver
```
After setup, add one or more posts via admin and navigate to `/collab/1`.

### Frontend dep building (optional)
```
npm install
npm run build
```

## Notes

### Client
- Uses a static editor-bundle that contains y-quill and quill cursors (package built via npm/vite).
- Mandatory: Only import Yjs a single time. Some dependencies must be built via bundler since UMD is not supported, only ESM.
- Custom `widget.html` override injects cursors into modules and initializes binding if `instance_id` and `model` are set in attrs. of forms.py
  - Example: 
    ```python
    self.fields['field_name_to_make_collaborative'].widget.attrs.update({
        'model': 'demo.QuillPost', 
        'instance_id': instance_id
    })
    ```
- The username of the current user must be injected into the `quillpost_form`. A separate WebSocket connection is created for each form to support multiple fields on the same Ydoc connection,  without creating a connection per field.

### Server
- Configured with Django Channels ASGI setup and a custom YjsConsumer to load the Quill delta into a Ydoc test delta.
- Uses a global dictionary to manage room persistence and client count before deleting the Ydoc. (only for quick testing)
- Redis implementation from https://github.com/jupyter-server/pycrdt-websocket/pull/25 has to be tested.
- More advanced permissions need to be checked during WebSocket connection (`connect()`) in Consumers

