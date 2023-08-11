#!/usr/bin/env python3

# Standard library imports
from models import User, Movie, UserMovie

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!
def create_user_movies(user):
    movies = Movie.query.all()
    if user:
        for movie in movies:
            seen_check = False
            favorited = False
            wishlisted = False

            user_movie = UserMovie(
                user=user,
                movie=movie,
                favorite=favorited,
                seen=seen_check,
                wishlist=wishlisted,
            )

            db.session.add(user_movie)
    db.session.commit()

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Users(Resource):

    def get(self):
        return make_response([user.to_dict(rules=("-user_movies", "-movies", )) for user in User.query.all()], 200)
    
    def post(self):
        data = request.json
        try:
            user = User(
                first_name = data["first_name"],
                last_name = data["last_name"],
                username = data["username"],
                password = data["password"],
                profile_picture = data["profile_picture"],
                about_me = data["about_me"]
            )
        except ValueError as v_error:
            return make_response({ "errors": [str(v_error)]}, 400)
        
        db.session.add(user)
        db.session.commit()

        create_user_movies(user)
        
        return make_response(user.to_dict(rules=("-user_movies", "-movies", )), 201)

api.add_resource(Users, "/users")

class UsersById(Resource):

    def get(self, id): 
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({
                "Error" : "User not found"
            }, 404)
        else:
            # Nobody touch this, it took literal hours 
            return make_response(user.to_dict(only=(
                "user_movies", "-user_movies.user", 
                "-user_movies.movie.user_movies", "id", 
                "first_name", "last_name", "username", 
                "password", "profile_picture", "about_me", ))
                , 200)
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({
                "Error" : "User not found"
            }, 404)
        else:
            data = request.json
            for attr in data:
                try:
                    setattr(user, attr, data[attr])
                except ValueError as v_error:
                    return make_response([str(v_error)], 400)
                
            db.session.commit()
            return make_response(user.to_dict(only=(
            "user_movies", "-user_movies.user", 
            "-user_movies.movie.user_movies", "id", 
            "first_name", "last_name", "username", 
            "password", "profile_picture", "about_me", )), 200)
            
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({
                "Error" : "User not found"
            }, 400)
        else: 
            db.session.delete(user)
            db.session.commit()

            return make_response(f"User {id} deleted successfully", 204)

api.add_resource(UsersById, "/users/<int:id>")

class Movies(Resource):

    def get(self):
        return make_response([m.to_dict(rules=("-user_movies", "-users", )) for m in Movie.query.all()], 200)
    
    def post(self):
        data = request.json
        try:
            movie = Movie(
                name = data["name"],
                image = data["image"],
                genres = data["genres"]
            )
        except ValueError as v_error:
            return make_response({ "errors": [str(v_error)]}, 400)
        
        db.session.add(movie)
        db.session.commit()
        return make_response(movie.to_dict(rules=("-user_movies", "-users", )), 201)

api.add_resource(Movies, "/movies")

class MoviesById(Resource):

    def get(self, id):
        movie = Movie.query.filter(Movie.id == id).first()
        if not movie:
            return make_response({
                "Error" : "Movie not found"
            }, 404)
        else: 
            return make_response(movie.to_dict(only=(
                "id", "image", "description", 
                "genres", "-users", "user_movies", 
                "-user_movies.user", "-user_movies.movie", 
            )), 200)

api.add_resource(MoviesById, "/movies/<int:id>")

class UserMovies(Resource):
    
    def get(self):
        return make_response([usermovie.to_dict(rules=("-user", "-movie", )) for usermovie in UserMovie.query.all()])

api.add_resource(UserMovies, "/users-movies")

class UserMoviesById(Resource):

    def patch(self, id):
        usermovie = UserMovie.query.filter(UserMovie.id == id).first()
        if not usermovie:
            return make_response({
                "Error" : "User movie not found",
            }, 404)
        else:
            data = request.json
            for attr in data:
                try:
                    setattr(usermovie, attr, data[attr])
                except ValueError as v_error:
                    return make_response([str(v_error)], 400)
            db.session.commit()
            return make_response(usermovie.to_dict(rules=("-user", "-movie", )), 200)

api.add_resource(UserMoviesById, "/users-movies/<int:id>")

class UserLogin(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {"message": "Invalid username or password"}, 400

        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            return {"message": "Login successful", "user_id": user.id}, 200
        else:
            return {"message": "Invalid username or password"}, 401
        
api.add_resource(UserLogin, "/api/login")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

