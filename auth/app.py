"""
Auth service, which stands as an authority issuer of tokens.
"""

import jwt
from apistar import typesystem, Route
from apistar.frameworks.wsgi import WSGIApp as App


# The most advanced user's database ever, TM
USERS = {
    ('admin', 'admin'): {
        'eid': 'ANADMINSEID',
        'is_admin': True,
        'roles': 'admin',
    },
    ('user', 'user'): {
        'eid': 'ANUSERSEID',
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
    return {'token': jwt.encode(user, 'secret', algorithm='HS256').decode()}


ROUTES = [
    Route('/auth/login', 'POST', login),
]

app = App(routes=ROUTES)
