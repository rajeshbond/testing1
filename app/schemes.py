from pydantic import BaseModel
from datetime import datetime , date

class SignIn(BaseModel):
    email:str
    password:str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "sample@gmail.com",
                "password": "password"
            }
        }

class Signup(BaseModel):
    name:str
    email:str
    password:str
    mobile:str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "sample",
                "email": "sample@gmail.com",
                "password": "password",
                "mobile": "1234567890"

            }
        }

class Forgetpwd(BaseModel):
    email:str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "sample@gmail.com",
            }
        }
class Token(BaseModel):
    idToken: str
    refreshToken: str
class UserData(Forgetpwd):
    pass

class DiscountCode(BaseModel):
    code:str
class RazorpayOrder(BaseModel):
    amount:int
    plan:str
    coupon_applied:str
class RazarPayConfrimation(BaseModel):
    payment_id:str
    orderId:str
    signature:str   
    plan:str
    Amount:int
    coupon_applied:str
class Updatecoupon(BaseModel):
    couponused:str





