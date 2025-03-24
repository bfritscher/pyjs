
python -m venv venv
activate venv
pip install -r requirements.txt
npm install
npm run dev
python manage.py migrate
python manage.py collectstatic
python manage.py runserver