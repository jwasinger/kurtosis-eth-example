#! python

import docker
from web3 import Web3, AsyncWeb3

client = docker.from_env()

def get_client_port(name: str):
	for container in client.containers.list():
		if not name in container.name:
			continue

		for port, host_mapping in container.ports.items():
			if not "8545" in port:
				continue

			print(host_mapping[0]['HostPort'])
			return

	raise Exception("service not found: {}".format(name))

get_client_port("el-client-1")
