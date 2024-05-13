import smtplib
from email.message import EmailMessage

from src.config import SMTP_PASS, SMTP_USER, SMTP_HOST, SMTP_PORT


def get_template(address):
    email = EmailMessage()
    email["Subject"] = ""
    email["From"] = SMTP_USER
    email["To"] = address

    email.set_content(
        "",
        subtype="html"
    )
    return email


def reset_password(address):
    email = get_template(address)
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(email)
