import imp


import logging
logging.basicConfig(
    format='[%(asctime)s] [%(levelname)s] : %(message)s',
    filename="debug.log", 
    level=logging.DEBUG,
     datefmt='%Y/%d/%m/ %I:%M:%S %p',
)

def log_info(message):
    logging.info(message)

def log_warn(message):
    logging.warning(message)

def log_error(message):
    logging.error(message)
    