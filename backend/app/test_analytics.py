from backend.app.analytics import detect_regression

baseline_a = [0.90, 0.85, 0.88, 0.92, 0.87]
current_a  = [0.89, 0.86, 0.87, 0.90, 0.88]  

baseline_b = [0.90, 0.85, 0.88, 0.92, 0.87]
current_b  = [0.45, 0.50, 0.38, 0.52, 0.47]  

print("Running Regression Detector Tests...")

regression_a = detect_regression(baseline_a, current_a)
print(f"Test A (Minor changes) - Regression Detected? {regression_a}")  

regression_b = detect_regression(baseline_b, current_b)
print(f"Test B (Massive drop)  - Regression Detected? {regression_b}")  