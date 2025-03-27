/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React, { useState } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";

function DiscoverJourneyApp() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setItinerary(`Sample Itinerary for ${destination}:
      
Day 1: Arrival in ${destination}
• Check into hotel (₹${Math.floor(budget*0.2)})
• Explore local markets
• Dinner at local restaurant (₹500 per person)

Day 2: Sightseeing
• Morning tour of main attractions
• Lunch at popular cafe (₹300 per person)
• Afternoon free time
• Evening cultural show (₹800 per person)`);
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trip-planner-container">
      <div className="background-overlay"></div>
      <div className="content">
        <h1>🌍 Discover Your Perfect Journey</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Travelers</label>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Total budget in Rupees"
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Interests</label>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Adventure, culture, food, relaxation..."
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Generating Itinerary..." : "Plan My Trip 🚀"}
          </button>
        </form>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Crafting your perfect trip...</p>
          </div>
        )}

        {itinerary && (
          <div className="itinerary-result">
            <h2>Your Personalized Itinerary</h2>
            <div className="itinerary-content">
              {itinerary.split('\n').map((line, index) => (
                <div key={index} className="itinerary-line">
                  {line.startsWith('Day') ? (
                    <div className="day-header">{line}</div>
                  ) : line.trim() ? (
                    <div className="detail-line">
                      <span className="bullet">•</span>
                      {line}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mount the app
const root = createRoot(document.getElementById('trip-planner-root'));
root.render(<DiscoverJourneyApp />);