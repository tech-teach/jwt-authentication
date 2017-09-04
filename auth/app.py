"""
Auth service, which stands as an authority issuer of tokens.
"""

import jwt
from apistar import typesystem, Route
from apistar.frameworks.wsgi import WSGIApp as App


# Im the master thing, so I can know the secrets, therefore hold a private key
PRIVATE_KEY = """
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAp6aWR0qcqFeCmK/lxgYfrTSXx7/WTpBqSp18TbLcjr1QV4ky
xswG+QzDl7EITokSd3yvI6eMbv6NxkRqumG7M50mNKm6DljRMh26/R4z17r4IFgN
Zr60FQ48cHWE7xl5O4INSyjHGIK6vHepDsbHeGJNYAbeNTB0F9CHl6TKYeZNAnYV
ykPdC3/Wp5TzLNP6KgDvGMlyLHh1ZyF0Xau+bupGvvMfnL9hw04/Y7eCr8knVFOV
fC5elNt6NMxKtjutm/EqLW49tZRvVG5IvNhFmr2G4QzmRT6WmaWgq19L9eZ4S4qo
DsYeE7SE3LWqBPR/O3L8GCw9wJEeG+A75k/QqwIDAQABAoIBAGmrmrU81hlVbz+G
PzHd0kF+EN0akZ3bcOOu+BaRUmu179n85EBhgVOhM/d84lt+EmG1+T5j8SRU1k/N
9+eaikAyIU64XEmGufT4wE+ipdKoSpU4atoEAcXzvyyzJiL+z2cuxepFvZg5bjI0
yh5CNKAwdcy9B3pHHCWWjqCKgfXKCgJpzDm8LTLquEw4FsN65Wnl0fTcWH8eNMwk
VecplMbP2bgnqHnlRvzKMMfHDLiRf4woJFHxje+66ojEyKDJUwSzOQmTVcPaadlT
qoeC2RAT/321us7okYNtsNXdH+HRreI49z1yzyi3RlOyj9eFMcxzzAf7suekVWuS
zJgdKEECgYEA2DDvwsbRCKFw48IKwXDSdcjL9VTE3Ml6GT5Q11H5cnjpVF9V+glD
kAx3Mp6tCM662l05rXRtpyW22+8M2sI2cqBgy8Cm9tKtvXcWLL545rwIk2vxwFOU
MZHT51wT3XOy5OohB8fL2sre0MLOIZyo/62BkQLS4sAHFC2Cm8/ZljkCgYEAxoV/
MYBJEPShrpvDozkO34AmGljdKPYTup4DGMXLKS3TVLzc7QvzAEfZxFkCg/7dHicS
EelTGT6/th8uA50ldTNNJ2/mSuHokXds9UcYl+Rm3fqwQM/OolWwCJBt1BogPehG
JLZE7LkQ6BDs1zMwi0UHDnJiojOJI8l6Tj1rfgMCgYEAuclUQg6ZlNEoMpKOq65J
Lu9gV3SBuTtrskXbMy8/LyC5Y8iKGlXbue78gIPcL7V43i8/YdCsavf+LQNCCLze
DaPFi1QEKBjlNe0hIVKOk7sDo60gFCe/MtofQLPgXm8PTanmuMj6Zwvwb3b5rejz
UsXIktXaZQKhErYJh90XIAECgYB78mGlsGjuMy63a/1L7ZYBqWsgzBbZOjq7K2jX
kLb1sOzfXUO6pNlFdZbbZo+RhhDcgJxhnoIJownjVbhO/VCjyjIDy3PHkSC5ogzf
X1JVk38+XQSqkpR6+nD8B+Dqqp0yydDxnvONsUaC/f5Bpm5KpgBv3q8Cgpa/R04b
h3GTrQKBgQCOC15OY9u20SEC6+bY989juDEaqU3qfnYTP7qiG7xiv2oX+KvbVpBi
E4bZDgKUZoPGNMEE85WiB99HuDI7ACcB7qN4t4la/tQ7pI+llbG7tGi8JaKiV7Ty
vk7an0d2lu73KnwDnr4oz7yCNfWenV+5SS3hVQaS4QKLnfB3AIN68w==
-----END RSA PRIVATE KEY-----
"""


# The most advanced user's database ever, TM
USERS = {
    ('admin', 'admin'): {
        'eid': 'ANADMINSEID',
        'is_admin': True,
        'username': 'admin',
        'roles': 'admin',
    },
    ('user', 'user'): {
        'eid': 'ANUSERSEID',
        'username': 'user',
        'is_admin': False,
        'roles': 'pleb',
    }
}


def authenticate(username, password):
    """
    Verify the identity of a user.
    """
    return USERS.get((username, password), None)


class Credentials(typesystem.Object):
    """
    Structure for credentials in apistar.
    """
    properties = {
        'username': typesystem.String,
        'password': typesystem.String,
    }


def login(credentials: Credentials):
    """
    Request to login an user.
    """
    user = authenticate(credentials['username'], credentials['password'])
    if not user:
        return {'token': None}
    return {'token': jwt.encode(user, PRIVATE_KEY, algorithm='RS256').decode()}


ROUTES = [
    Route('/auth/login', 'POST', login),
]

app = App(routes=ROUTES)
