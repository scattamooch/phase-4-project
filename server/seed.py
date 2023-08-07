#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import User, Movie, UserMovie

# Remote library imports
from faker import Faker
fake = Faker()

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Movie.query.delete()
        UserMovie.query.delete()

        print("Starting seed...")

        # Create Users
        def create_users():
            users_first_name = ["Sean", "Will", "Adam", "Mike"]
            users_last_name = ["Stevens", "Lowenkamp", "Mauch", "Urezzio"]
            usernames = ["Sstevens", "Wlowenkamp", "Amauch", "Murezzio"]
            for first_name, last_name, username in zip(users_first_name, users_last_name, usernames):
                user = User(
                    first_name=first_name,
                    last_name=last_name,
                    username = username,
                    password = "password",
                    profile_picture = "https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png",
                    about_me = "I like movies!",
                )
                db.session.add(user)
            db.session.commit()

        def create_movies():
            for _ in range(20):
                movie = Movie(
                    name = str(fake.sentence(nb_words=3)),
                    image = "https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png",
                    description = str(fake.paragraph()),
                    genres = "Filler1, Filler2, Filler3",
                )
                db.session.add(movie)
            db.session.commit()

        def create_user_movies():
            users = User.query.all()
            movies = Movie.query.all()
            for user in users:
                for movie in movies:
                    user_movie = UserMovie(
                        user = user,
                        movie = movie,
                        favorite = fake.boolean(),
                        seen = fake.boolean(),
                        wishlist = fake.boolean(),
                    )
                    db.session.add(user_movie)
            db.session.commit()


        print("Seeding users...")
        create_users()

        print("Seeding movies...")
        create_movies()

        print("Seeding user_movie booleans...")
        create_user_movies()
        
        print("Done seeding!")