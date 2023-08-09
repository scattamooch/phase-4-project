from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

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

    #validations
    @validates("first_name")
    def validates_first_name(self, key, new_first_name):
        if not new_first_name:
            raise ValueError("A first name must be provided")
        elif len(new_first_name) > 15:
            raise ValueError("A name must be shorter than 15 characters")
        else: 
            return new_first_name
        
    @validates("last_name")
    def validates_last_name(self, key, new_last_name):
        if not new_last_name:
            raise ValueError("A last name must be provided")
        elif len(new_last_name) > 20:
            raise ValueError("A last name must be shorter than 20 characters")
        else:
            return new_last_name
        
    @validates("username")
    def validates_username(self, key, new_username):
        if not new_username:
            raise ValueError("A username must be provided")
        elif len(new_username) > 20:
            raise ValueError("A username must be shorter than 15 characters")
        else: 
            existing_user = User.query.filter(new_username == User.username).first()
            if existing_user:
                raise ValueError("That username already exists")
            
            return new_username
        
    @validates("password")
    def validates_password(self, key, new_password):
        if not new_password:
            raise ValueError("Please set a password")
        has_letter = False
        has_number = False

        for char in new_password:
            if char.isalpha():
                has_letter = True
            elif char.isdigit():
                has_number = True

            if has_letter and has_number:
                break
            
        if not (has_letter and has_number):
            raise ValueError("Password must contain at least one letter AND at least one number")
        
        return new_password
    
    @validates("profile_picture")
    def validates_profile_picture(self, key, new_profile_picture):
        if not new_profile_picture:
            new_profile_picture = "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"

        return new_profile_picture
    
    @validates("about_me")
    def validates_about_me(self, key, new_about_me):
        if not new_about_me:
            new_about_me = "I'm shy and didn't want to share :("
        elif len(new_about_me) > 250:
            raise ValueError("Oops! We wanted a little blurb, not your life story. Let's trim that down a bit, shall we?")
        
        return new_about_me
        

    def __repr__(self):
        return f'<User {self.id}: {self.first_name} {self.last_name}>'

class Movie(db.Model, SerializerMixin):
    __tablename__= "movies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    # description = db.Column(db.Text) 
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
