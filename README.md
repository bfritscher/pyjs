
## TODO

- redis backend store : copy storage and adapt yjs_consumer https://github.com/jupyter-server/pycrdt-websocket/pull/25



## Setup

```
python -m venv venv
activate venv
pip install -r requirements.txt
npm install
npm run dev
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
python manage.py runserver
add a one or more post via admin and naviguate to /collab/1
```


## Notes
### client
- we have static editor-bundle which contains y-quill and quill cursors (package build via npm/vite)
- custom overrides django_quill.js 
- custom widget.html override to inject cursors into modules and initialize binding if instance_id and model are set in attrs via form (self.fields['field_name_to_make_collaborative'].widget.attrs.update({'model': 'demo.QuillPost', 'instance_id': instance_id}))
- username of current user has to be injected into quillpost_form, (this part could be more standardised for easy reuse in multiple forms) We create one WS connection per form, to support multiple fields on the same ydoc connection.
### server
- we have a django channels asgi setup, with Custom YjsConsumer to load the quill delta into a ydoc.test delta
- room persistence is a global dictionnary and we count number of client to delete ydoc. 
- redis implementation from https://github.com/jupyter-server/pycrdt-websocket/pull/25 should be tests instead
- more advanced permissions need to be checked in connect()

