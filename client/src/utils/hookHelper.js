import { useLayoutEffect, useEffect, useRef, useState, useMemo, useCallback } from 'react';

export const useUpdateSize = (callback) => {
  useLayoutEffect(() => {
    const updateSize = () => {
      callback(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [callback]);
};

export const useCurrentLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          setLocation({ latitude, longitude });
        },
        (error) => {
          setIsError(error.message);
        }
      );
    };

    getLocation();
  }, []);

  return { location, isError };
};

export const useDraggableMarker = (initialPosition) => {
  const [markerPosition, setMarkerPosition] = useState(initialPosition || [0, 0]);
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef?.current;
        if (marker) {
          setMarkerPosition(marker?.getLatLng());
        }
      },
    }),
    [markerRef]
  );

  useEffect(() => {
    if (initialPosition.length === 0) {
      setMarkerPosition(initialPosition);
    }
  }, [initialPosition]);

  return { markerPosition, markerRef, eventHandlers };
};

const useCountdownTimer = (expirationTime) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    const expTime = Math.floor(expirationTime / 1000);
    return Math.max(expTime - now, 0);
  }, [expirationTime]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [calculateTimeRemaining]);

  return { time: timeRemaining };
};

export default useCountdownTimer;
