import { useLayoutEffect, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

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

export const useChat = (roomChatData, userData) => {
  const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
  const SOCKET_SERVER_URL = 'http://localhost:8080';

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const { id, participants, name, adminRoomId } = roomChatData;
  const participant = participants.some((item) => item.userId === userData.id);
  const adminRoom = userData.id === adminRoomId;

  useEffect(() => {
    const handleRoomChatNotFound = (data) => {
      alert(`RoomChat not found for roomId: ${data.roomId}`);
      navigate('/');
    };

    const handleRoomChatError = (data) => {
      alert('Error finding RoomChat:', data.error);
    };

    if (!participant) {
      navigate('/');
    }
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId: id },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: participant,
        isAdminRoom: adminRoom,
      };

      setMessages((msg) => [...msg, incomingMessage]);
    });

    socketRef.current.on('roomChatNotFound', handleRoomChatNotFound);
    socketRef.current.on('roomChatError', handleRoomChatError);

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off('roomChatNotFound', handleRoomChatNotFound);
      socketRef.current.off('roomChatError', handleRoomChatError);
    };
  }, [name]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: userData.id,
    });
  };

  return {
    messages,
    sendMessage,
  };
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
