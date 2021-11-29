import React, { FC, useState, useCallback, useEffect } from "react";
import storyData from "./data/data.json";
import ImageWithFallback from "./ImageWithFallback";
import dummyImage from "./assets/dummyImage.png";
import "./App.scss";

type Story = {
  url: string;
  thumbnail: string;
  headline: string;
};

type State = {
  stories: Story[];
  isLoading: boolean;
  error: boolean;
};

const App: FC = () => {
  const [{ stories, isLoading, error }, setState] = useState<State>({
    stories: [],
    isLoading: false,
    error: false,
  });

  const fetchStories = useCallback(() => {
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    try {
      const data = storyData;

      setState((state) => ({
        ...state,
        stories: data,
        isLoading: false,
        error: false,
      }));
    } catch (error) {
      setState((state) => ({
        ...state,
        isLoading: false,
        error: true,
      }));
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : !isLoading && error ? (
        <div>Error</div>
      ) : (
        stories.map((story, index) => (
          <a href={story.url} key={index} className="story">
            <ImageWithFallback
              src={story.thumbnail}
              alt={story.headline}
              fallback={dummyImage}
            />
            <div className="story-text">
              <h3 className="headline">{story.headline}</h3>
              <h5 className="story-type">NEWS</h5>
            </div>
          </a>
        ))
      )}
    </div>
  );
};

export default App;
