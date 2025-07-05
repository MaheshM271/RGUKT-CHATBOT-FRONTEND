
export interface ExerciseErrors {
    nameError?: string;
    categoryError?: string;
    descriptionError?: string;
    videoLinkError?: string;
    tagsError?: string;
    focusError?: string;
}
  
export const validateExerciseFields = (exercise: any): ExerciseErrors => {
    const errors: ExerciseErrors = {};
  
    if (exercise) {
      if (!exercise.exerciseName) errors.nameError = "Exercise name is required";
      if (!exercise.category) errors.categoryError = "Category is required";
      if (!exercise.description) errors.descriptionError = "Description is required";
      if (!exercise.videoLink) errors.videoLinkError = "Video link is required";
      if (!exercise.tags?.[0]) errors.tagsError = "Tag is required";
      if (!exercise.focus) errors.focusError = "Focus is required";
    }
  
    return errors;
};

