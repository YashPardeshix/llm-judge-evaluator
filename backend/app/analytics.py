from scipy import stats

def detect_regression(baseline_scores: list[float], new_scores: list[float]) -> bool:
    """
    Compares two lists of scores to detect if there is a statistically
    significant drop in quality (a regression).
    """
    if len(baseline_scores) < 2 or len(new_scores) < 2:
        return False
        
    t_stat, p_value = stats.ttest_ind(baseline_scores, new_scores, equal_var=False)
    
    baseline_avg = sum(baseline_scores) / len(baseline_scores)
    new_avg = sum(new_scores) / len(new_scores)
    
    if new_avg < baseline_avg and p_value < 0.05:
        return True 
    return False  