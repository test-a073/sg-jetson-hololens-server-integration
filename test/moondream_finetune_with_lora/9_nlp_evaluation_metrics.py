responses_dict = {
    "moondream": "On the desk", 
    "llama-vision": "The water bottle is on the desk in front of the computer monitor."
    }

teacher_model_response = responses_dict["llama-vision"]
student_model_response = responses_dict["moondream"]

# Define function to calculate BLEU score
from nltk.translate.bleu_score import sentence_bleu

def calculate_bleu_score(candidate_sentence_str, reference_sentence_str):
    """
    https://www.nltk.org/_modules/nltk/translate/bleu_score.html
    paper : https://www.aclweb.org/anthology/P02-1040.pdf
    """
    candidate = candidate_sentence_str.split()
    reference = reference_sentence_str.split()

    weights = [
        (1./2., 1./2.),
        # (1./3., 1./3., 1./3.),
        # (1./4., 1./4., 1./4., 1./4.)
            ]
    return sentence_bleu([reference], candidate, weights=weights)

bleu_score = calculate_bleu_score(candidate_sentence_str=student_model_response, reference_sentence_str=teacher_model_response)
print(f"BLEU Score (2-grams): {bleu_score}")

#----------------------------------------#
