# Hololens integration code

## Contents


## Folder Structure

1. Jetson_client - contains the code to be run on the Jetson orin nano
2. test
3. Workstation - Contains the code to be run on the workstation

## Configuration (Jetson Orin Nano)


### Jetson Orin Nano 

```JS
Jetson Orin Nano 
CUDA_VERSION  = 11.4 
NVIDIA-JETPACK = 5.1.1-b56
OS = Ubuntu 20.04 focal
Python Virtual Environment version = Python 3.8.10
GCC Compiler Version : [GCC 9.4.0]
```

### Workstation

## Setting up the Jetson Orin Nano Environment

1. First Check whether your Jetson Orin Nano configuration matches with the above configuration

2. Clone the repository 

```BASH
git clone git@
```

2. Install Python3-venv if it is not installed

```bash
sudo apt update
sudo apt install python3-venv
```

3. Create the virtual environme
```bash
python3 -m venv jetson_env
```

4. Activate the environment
```bash
source venv_name/bin/activate
```

5. Some of the dependencies you will have to build from scratch 

  