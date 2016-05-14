
import sys

def write():

    try:
        file = open('test.txt','r+')   # Trying to create a new file or open one
        file.close()

    except:
        print('Something went wrong! Can\'t tell what?')
        sys.exit(0) # quit Python

write()
