let backingArray = [];

class Workout {
    constructor(name) {
        this.name = name;
        this.exercises = [];
    }

    addExercise(name, sets, reps) {
        this.exercises.push(new Exercise(name, sets, reps));
    }
}

class Exercise {
    constructor(name, sets, reps) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
    }
}

class WorkoutService {
    static getAllWorkouts() {
        return backingArray;
    }

    static getWorkout(name) {
        for (let workout of backingArray) {
            if (workout.name === name) {
                return workout;
            }
        }
        return;
    }

    static createWorkout(workout) {
        backingArray.push(workout);
    }

    static updateWorkout(workout) {
        for (let i = 0; i < backingArray.length; i++) {
            if (backingArray[i].name === workout.name) {
                backingArray[i] = workout;
            }
        }
    }

    static deleteWorkout(workoutName) {
        for (let i = 0; i < backingArray.length; i++) {
            if (backingArray[i].name === workoutName) {
                backingArray.splice(i, 1);
            }
        }
    }
}

class DOMManager {  
    static deleteWorkout(name) {
        WorkoutService.deleteWorkout(name);
        this.render(backingArray);
    }

    static createWorkout(name) {
        WorkoutService.createWorkout(new Workout(name));
        this.render(backingArray);
    }

    static addExercise(workoutName) {
        for (let i = 0; i < backingArray.length; i++) {
            if (backingArray[i].name === workoutName) {
                backingArray[i].exercises.push(new Exercise($(`#${workoutName}-exercise-name`).val(), $(`#${workoutName}-exercise-sets`).val(), $(`#${workoutName}-exercise-reps`).val()));
                this.render(backingArray);
            }
        }
    }

    static deleteExercise(workoutName, exerciseName) {
        for (let i = 0; i < backingArray.length; i++) {
            if (backingArray[i].name === workoutName) {
                for ( let j = 0; j < backingArray[i].exercises.length; j++) {
                    if (backingArray[i].exercises[j].name === exerciseName) {
                        backingArray[i].exercises.splice(j, 1);
                        this.render(backingArray);
                    }
                }
            }
        }
    }

    static render(workouts) {
        $('#app').empty();
        for (let workout of workouts) {
            $('#app').prepend(
                `<div id="${workout.name}" class="card">
                    <div class"card-header">
                        <h2>${workout.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteWorkout('${workout.name}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${workout.name}-exercise-name" class="form-control" placeholder="Exercise Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${workout.name}-exercise-sets" class="form-control" placeholder="Exercise Sets">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${workout.name}-exercise-reps" class="form-control" placeholder="Exercise Reps">
                                </div>
                            </div>
                            <button id="${workout.name}-new-exercise" onclick="DOMManager.addExercise('${workout.name}')" class="btn btn-primary form-control">Add</button>
                        </div>
                    </div>
                </div><br>`
            );
            for (let exercise of workout.exercises) {
                $(`#${workout.name}`).find('.card-body').append(
                    `<p>
                    <span id="name-${exercise.name}"><strong>- </strong> ${exercise.name}</span>
                    <span id="sets-reps-${exercise.name}">${exercise.sets}X${exercise.reps}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteExercise('${workout.name}', '${exercise.name}')">Delete Exercise</button>`
                )
            }
        }
    }
}

$('#create-workout-btn').click(() => {
    DOMManager.createWorkout($('#new-workout').val());
    $('#new-workout').val('');
});