from pydantic import BaseModel

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str

class SigninRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
