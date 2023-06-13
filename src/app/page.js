"use client";
import Image from "next/image";
import styles from "./page.module.css";
import stylesDragAndDrop from "./styles/dragAndDropStyles";
import { useEffect, useState, CSSProperties } from "react";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import processCsv from "./helpers/processCsv";

const fileTypes = ["CSV"];

const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

const Home = () => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [trips, setTrips] = useState({});
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Drone Delivery Service</p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By {" Everson Zelaya Sanchez "}
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <p className={styles.selectInput}>
          Please select a input file of available drones and locations
        </p>
        <CSVReader
          onUploadAccepted={(results) => {
            if (results?.data?.length > 0) {
              const calculatedTrips = processCsv(results.data);
              setTrips(calculatedTrips);
            }
            setZoneHover(false);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }) => (
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                stylesDragAndDrop.zone,
                zoneHover && stylesDragAndDrop.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={stylesDragAndDrop.file}>
                    <div style={stylesDragAndDrop.info}>
                      <span style={stylesDragAndDrop.size}>
                        Size: {formatFileSize(acceptedFile.size)}
                      </span>
                      <span style={stylesDragAndDrop.name}>
                        {acceptedFile.name}
                      </span>
                    </div>
                    <div style={stylesDragAndDrop.progressBar}>
                      <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={stylesDragAndDrop.remove}
                      onMouseOver={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                </>
              ) : (
                "Drop CSV file here or click to upload"
              )}
            </div>
          )}
        </CSVReader>
      </div>

      <div>
        <p className={styles.detailsText}>
          Trips each drone will make to have the less amount of trip possibles:{" "}
        </p>
        {Object.keys(trips).map((drone, i) => (
          <div key={`droneKey-${i}`} className={styles.droneSection}>
            <span>
              {drone} :{" "}
              {Object.keys(trips[drone]).map((trip, i) => (
                <p key={`locationKey-${i}`} className={styles.tripSection}>
                  {" "}
                  {trip} : {JSON.stringify(trips[drone][trip])}
                </p>
              ))}
            </span>
          </div>
        ))}
      </div>
      
    </main>
  );
};

export default Home;
