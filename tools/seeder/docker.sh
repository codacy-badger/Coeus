#! /bin/bash

mongoimport --host mongodb --db coeus --collection user --type json --file ./data/user.json --jsonArray
