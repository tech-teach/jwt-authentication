"""
I'm a naive service just lurking around. I don't know about users, but
I'm part of a larger ecosystem, so I have keys to verify tokens around.
"""

import jwt
from apistar import http, Route, Component
from apistar.frameworks.wsgi import WSGIApp as App

KEY = 'secret'


class User(object):
    """
    Need an user wrapper -.-
    """
    def __init__(self, _dict):
        self.dict = _dict

    def __getattr__(self, key):
        if key in self.dict:
            return self.dict.get(key)
        return super().__getattribute__(key)


def authenticate_user(authorization: http.Header):
    """
    Determine the user associated with a request, using a token Bearer.
    """
    if authorization is None:
        return None
    scheme, token = authorization.split()
    if scheme.lower() != 'bearer':
        return None
    return User(jwt.decode(token, KEY, algorithms=['HS256']))


def protected(user: User):
    """
    A protected url of the service.
    """
    if not user:
        return {'message': 'tsu tsu'}
    return {'message': f'you are a true user {user.username}'}


def secret(user: User):
    """
    A secret url of the service, only available for admin.
    """
    if not user:
        return {'message': 'tsu tsu'}
    if not user.is_admin:
        return {'message': f'wont tell you ma secret {user.username}'}
    return {
        'message': f'you are a true user {user.username}',
        'secret': f'this is a super secret message',
    }


ROUTES = [
    Route('/service/protected', 'GET', protected),
    Route('/service/secret', 'GET', secret),
]

COMPONENTS = [
    Component(User, authenticate_user),
]

app = App(routes=ROUTES, components=COMPONENTS)
