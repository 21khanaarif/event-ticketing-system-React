import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import Pagination from './components/Pagination';
import EventCard from "./components/EventCard";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const eventsPerPage = 6;

  // Fetch events from the API
  const fetchEvents = async (page = 1, query = '') => {
    try {
      const apiUrl = query
        ? `http://localhost:1337/api/events?populate=*&filters[Event_Name][$contains]=${query}`
        : `http://localhost:1337/api/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${eventsPerPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setEvents(data.data);
      if (!query) {
        setTotalPages(data.meta.pagination.pageCount);
      } else {
        setTotalPages(1); // Disable pagination for search results
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, load paginated results
      fetchEvents(currentPage);
    } else {
      // Otherwise, fetch results based on search query
      fetchEvents(1, searchQuery);
    }
  };

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchEvents(nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchEvents(prevPage);
    }
  };

  // Initial load of events when the component mounts
  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Events in Delhi-NCR</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <EventList events={events} />
      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      )}
    </div>
  );
};

export default App;
