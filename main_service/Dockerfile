FROM node:latest AS s_gui
ADD . /app
COPY ./gui/package.json /app/gui
WORKDIR /app/gui
RUN npm install
RUN npm run build

FROM python:latest
ADD . /app
WORKDIR /app
RUN pip install pipenv
RUN pipenv install --system --deploy
EXPOSE 5000
COPY --from=s_gui /app/gui/build /app/gui/build
CMD ["python3", "wsgi.py"]