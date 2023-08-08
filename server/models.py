from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, metadata

metadata = metadata
db = db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    about_me = db.Column(db.Text)


    #relationships
    user_movies = db.relationship("UserMovie", back_populates="user",
        cascade="all, delete-orphan")
    movies = association_proxy("user_movies", "movie")

    def __repr__(self):
        return f'<User {self.id}: {self.first_name} {self.last_name}>'

class Movie(db.Model, SerializerMixin):
    __tablename__= "movies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.Text) 
    genres = db.Column(db.String)

    #relationships
    user_movies = db.relationship("UserMovie", back_populates="movie")
    users = association_proxy("user_movies","user")

    def __repr__(self):
        return f'<Movie {self.id}: {self.name}>'

class UserMovie(db.Model, SerializerMixin):
    __tablename__ = "user_movies"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"))
    favorite = db.Column(db.Boolean)
    seen = db.Column(db.Boolean)
    wishlist = db.Column(db.Boolean)

    #relationships
    user = db.relationship("User", back_populates="user_movies")
    movie = db.relationship("Movie", back_populates="user_movies")

    def __repr__(self):
        return f'<User_movie {self.id}: {self.user_id}, {self.movie_id}>'
    
# class Rating(db.Model, SerializerMixin):
#     __tablename__ = "ratings"
#     id = 
#     rating = 
#     movie = 
#     user = 


# class Genre(db.Model, SerializerMixin):
#     __tablename__ = "genres"
