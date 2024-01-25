import pandas as pd
import numpy as np

# Function to generate random data
def generate_random_data(num_points):
    # Delhi coordinates
    delhi_center = (28.6139, 77.2090)
    
    # Generate random latitude and longitude points around Delhi
    latitudes = np.random.uniform(low=delhi_center[0] - 0.1, high=delhi_center[0] + 0.1, size=num_points)
    longitudes = np.random.uniform(low=delhi_center[1] - 0.1, high=delhi_center[1] + 0.1, size=num_points)
    
    # Generate random time in AM/PM format
    time_range = pd.date_range("00:00:00", "23:59:59", freq="S").time
    times = [time.strftime("%I:%M:%S %p") for time in np.random.choice(time_range, num_points)]
    
    # Generate random numbers ranging from 1 to 10
    numbers = np.random.randint(1, 11, size=num_points)
    
    # Create a DataFrame
    df = pd.DataFrame({'Latitude': latitudes, 'Longitude': longitudes, 'Time': times, 'Number': numbers})
    
    return df

# Generate 50 random points
random_data = generate_random_data(200)

# Save the generated data to a CSV file
random_data.to_csv('delhi_data.csv', index=False)

# Display the generated data
print(random_data)
