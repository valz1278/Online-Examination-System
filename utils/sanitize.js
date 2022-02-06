exports.sanitizeQuizForStudent = (questions = []) => {
    return questions.map((question) => ({
      type: question.type,
      _id: question._id,
      question: question.question,
      choices: question.choices,
    }));
  };