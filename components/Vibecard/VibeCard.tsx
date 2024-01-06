import React, { useState } from 'react';
import './VibeCard.scss';
import { motion, useCycle } from 'framer-motion';
import { LoremIpsum } from 'react-lorem-ipsum';

type Props = {
  events: any;
  onToggled: () => void;
};

const VibeCard: React.FC<Props> = ({ events, onToggled }) => {
  const [isActive, setIsActive] = useState(false);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const variants = {
    open: {
      zIndex: 1,
      y: 0,
      height: 0,
    },
    collapsed: {
      background: 'white',
      zIndex: 100,
      top: 0,
      height: getWindowDimensions().height * 0.95,
      margin: 0,
      transition: { duration: 0.1 },
    },
  };

  const [variant, toggleVariant] = useCycle('open', 'collapsed');

  const handleTap = () => {
    toggleVariant();
    onToggled();
    console.log(getWindowDimensions());
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div>
      <motion.div
        className="bg-cover h-[100px] absolute left-0 right-0 mx-[20px] z-[-1]"
        variants={variants}
        animate={variant}
      >
        <motion.div
          className="test2"
          animate={{ scale: 1.02 }}
          style={{ backgroundImage: `url('${events.image_url}')` }}
        >
          <div className="bg-[rgba(203,30,114,0.257)] rounded-lg h-[20vh] w-full flex items-center justify-center">
            <div className="text-white font-bold m-0 text-3xl">
              <motion.h1 onClick={() => handleTap()}>{events.title}</motion.h1>
            </div>
            <div className="absolute bottom-[10px] left-[10px] w-full">
              <div className="text-gray-200">{events.caption}</div>
            </div>
          </div>
        </motion.div>

        {isActive && (
          <div
            className="text-wrapper ion-padding"
            onClick={() => {
              handleTap();
            }}
          >
            <LoremIpsum p={2.01} />
          </div>
        )}
      </motion.div>

      <motion.div
        className="bg-red-500 rounded-lg my-[20px] z-[1000] h-[20vh] w-full opacity-0"
        onClick={() => {
          handleTap();
        }}
      >
        {events.title}
      </motion.div>
    </div>
  );
};

export default VibeCard;
