FROM nikolaik/python-nodejs:latest
ADD . /app
WORKDIR /app
RUN pipenv install --system --deploy
WORKDIR /app/gui
RUN npm run build
WORKDIR /app
EXPOSE 5000
CMD ["python3", "wsgi.py"]