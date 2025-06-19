## Screenshots


[Demo video](https://www.loom.com/share/5cf0ffa06f204db3a60c8b4782dba441?sid=8cae6fcf-866e-4956-9ad7-107cabab9c9c)

This is based on the [Sniff AI paper](https://arxiv.org/abs/2411.06950). Here, the user could describe a scent and the closest scent out of the 20 reference scents will be returned with a description.

![mango](/synthesis/src/assets/mango.png)

## Tech stack
**Frontend:**
- React and Vite for fast development and building
- Web Speech API for speech recognition
- Fetch API for backend communication

**Backend:**
- FastAPI and CORS middleware to allow cross-origin requests
- OpenAI API with text-embedding-3-small model (1536 dimensions)
- Numpy, cosine similarity for matching scents

## Getting started

### Prerequisites
- Node.js 16+ and yarn
- Python 3.9+ and uv for environment management
- OpenAI API key. Set in backend/.env
- Modern browser with Web Speech API support, e.g. Chrome.

Git clone the repository.

### Frontend

Open a terminal
```
cd synthesis  
yarn  
yarn dev  
```
Open up the url in your browser.

### Backend
Create a .env file and fill it with `OPENAI_API_KEY="your-api-key-here"`

Open a new terminal
```
cd backend
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Also open this url in your browser: http://localhost:8000


### Limitations
- Using the web speech API, the speech recognition stops after brief (1 - 2 seconds) of silence.

### Features to add
- Visualization
