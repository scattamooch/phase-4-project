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

if __name__ == "__main__":
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
            for first_name, last_name, username in zip(
                users_first_name, users_last_name, usernames
            ):
                user = User(
                    first_name=first_name,
                    last_name=last_name,
                    username=username,
                    password="password",
                    profile_picture="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png",
                    about_me="I like movies!",
                )
                db.session.add(user)
            db.session.commit()


        # Create Movies
        def create_movies():
            movie_titles = [
                "The Shawshank Redemption",
                "The Godfather",
                "The Dark Knight",
                "Pulp Fiction",
                "Forrest Gump",
                "Inception",
                "The Matrix",
                "Interstellar",
                "Gladiator",
                "The Lord of the Rings: The Fellowship of the Ring",
                "Titanic",
                "Avatar",
                "Jurassic Park",
                "The Lion King",
                "Frozen",
                "The Avengers",
                "Deadpool",
                "The Social Network",
                "La La Land",
                "The Grand Budapest Hotel",
            ]
            movie_genres = [
                "Drama",
                "Crime",
                "Action",
                "Crime",
                "Drama",
                "Sci-Fi",
                "Sci-Fi",
                "Sci-Fi",
                "Action",
                "Fantasy",
                "Romance",
                "Sci-Fi",
                "Adventure",
                "Animation",
                "Animation",
                "Action",
                "Action",
                "Drama",
                "Musical",
                "Comedy",
            ]
            movie_images = [
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9f22e23817c4accbf052e0f91a2b7821_156f8e4f-814c-4dcb-896d-0b077053cd51_500x749.jpg?v=1573593734",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/b5282f72126e4919911509e034a61f66_6ce2486d-e0da-4b7a-9148-722cdde610b8_500x749.jpg?v=1573616025",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/darkknight.building.mp_500x749.jpg?v=1648745750",
                "https://www.movieposters.com/cdn/shop/products/pulpfiction.2436_480x.progressive.jpg?v=1620048742",
                "https://www.movieposters.com/cdn/shop/products/forrest-gump---24x36_480x.progressive.jpg?v=1645558337",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/20664117398ad7301d9a9af6d2e5aa5c_1e3ea98b-b962-4982-9f74-2e44381fc6ff_500x749.jpg?v=1573618694",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ed4796ac6feff9d2a6115406f964c928_6b200bda-fe71-4900-ad7f-903cdda50dab_500x749.jpg?v=1573587596",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/interstellar5_f83e2c82-4b9c-4f59-86c1-895fff2b1935_500x749.jpg?v=1672934596",
                "https://www.movieposters.com/cdn/shop/products/2fb2fa7a5a0a022982abcf77771317bc_cdf2419f-5bd3-4d3e-98a2-94588c9b79cf_480x.progressive.jpg?v=1573592563",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ff72dccba2638b7aa656f55c282027cd_9b5a016a-d3ea-4c8d-9a79-69a06c0a4b39_500x749.jpg?v=1573651493",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/b88f1213c01b76e6eb509b28deaf97c4_cf8616aa-04be-4ef0-800d-27d71437a89c_500x749.jpg?v=1573595127",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/avatar.adv_500x749.jpg?v=1670962973",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4940c5878babf3dc5d2ca567b7558178_9e62fc4c-4116-48e5-a4f5-3a99c73ae7b1_500x749.jpg?v=1573651499",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/47e2bd2e8be54444cbe03d57cace38a8_e2aa699d-302b-42be-9c09-a76b6326224b_500x749.jpg?v=1573592718",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/frozen_ver8_500x749.jpg?v=1595012455",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/avengers.2436_500x749.jpg?v=1647534214",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/fbd2ba9964b4e051f67d8165e3f404cd_2232f1f7-e901-4b6b-8e95-85cc14c03aae_500x749.jpg?v=1573615888",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/2b3adf28f07240c40a9ba5f2bd01df3f_1776be06-81df-4a1e-85e6-146ff6513eb0_500x749.jpg?v=1573593770",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/6294ae3e57013170bfffc9e8d77379c3_500x749.jpg?v=1573617350",
                "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/44b26f88e0fb3f1bf0a0660c099b8b19_b27d3a0c-9867-4ef1-a59d-f5304521c18d_500x749.jpg?v=1573594939",
            ]

            for title, genre, image in zip(movie_titles, movie_genres, movie_images):
                movie = Movie(
                    title=title,
                    genres=genre,
                    image=image,

                db.session.add(movie)
            db.session.commit()

        def create_user_movies():
            users = User.query.all()
            movies = Movie.query.all()
            for user in users:
                for movie in movies:
                    user_movie = UserMovie(

                        user=user,
                        movie=movie,
                        favorite=fake.boolean(),
                        seen=fake.boolean(),
                        wishlist=fake.boolean(),

                    db.session.add(user_movie)
            db.session.commit()

        print("Seeding users...")
        create_users()

        print("Seeding movies...")
        create_movies()

        print("Seeding user_movie booleans...")
        create_user_movies()

        print("Done seeding!")
        
        print("Done seeding!")

