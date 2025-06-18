synthesis frontend:

cd synthesis
yarn
yarn dev

synthesis backend:
cd backend
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --reload --port 8000

then, open up the local url in your browser.


Limitations:
- Using the web speech API, the speech recognition stops after brief (1 - 2 seconds) of silence.