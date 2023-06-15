
# pluton - unified accounting for devs

pluton is build for all people who does not want to do all the tedious accounting proceedure

how to run api (from root)
```bash
uvicorn api.main:app --reload
```

## Installation

Install pluton via creating a own enviroment and run pip install. Here is an example given with conda.

```bash
  cd pluton
  conda create -n pluton python=3.11 -y
  pip install -r requirements.txt
```

## API Reference

Start the application and go to the route ```/docs`` there you can find a swagger documentation for this api.


## License

[MIT](https://choosealicense.com/licenses/mit/)

