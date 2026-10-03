"""A short, interactive general knowledge quiz."""

# Storage: keep track of the number of correct answers.
score = 0

# Question 1 - Ask & Capture, then Sanitize.
answer_1 = input("1. What is the largest ocean on Earth? ").strip().lower()

# Evaluate the sanitized answer and Execute the matching result.
if answer_1 == "pacific ocean":
    print("Correct!")
    score += 1
else:
    print("Incorrect!")
    print("Correct answer: Pacific Ocean")

# Question 2 - Ask & Capture, then Sanitize.
answer_2 = input("2. What is the capital of France? ").strip().lower()

# Evaluate the sanitized answer and Execute the matching result.
if answer_2 == "paris":
    print("Correct!")
    score += 1
else:
    print("Incorrect!")
    print("Correct answer: Paris")

# Question 3 - Ask & Capture, then Sanitize.
answer_3 = input("3. Which planet is known as the Red Planet? ").strip().lower()

# Evaluate the sanitized answer and Execute the matching result.
if answer_3 == "mars":
    print("Correct!")
    score += 1
else:
    print("Incorrect!")
    print("Correct answer: Mars")

# Output the final score and feedback for the user's performance.
print(f"Final score: {score}/3")

if score == 3:
    feedback = "Excellent"
elif score == 2:
    feedback = "Good Job"
elif score == 1:
    feedback = "Keep Practicing"
else:
    feedback = "Try Again"

print(f"Performance: {feedback}")