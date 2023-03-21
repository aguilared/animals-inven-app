import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  useQuery,
  onlineManager,
  focusManager,
  QueryClient,
} from "@tanstack/react-query";

import NetInfo from "@react-native-community/netinfo";
import useAppState from "react-native-appstate-hook";
import Constants from "expo-constants";
import { AppConfig } from "../app.config";
const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

type FormData = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function ModalAnimalView(Routes: Props) {
  console.log("RoutesAnimalsView", Routes);
  const animal = { ...Routes.route.params };

  useAppState({
    onChange: onAppStateChange,
  });

  const dates: any = new Date();
  const titulo = "Detalles Animal al " + convertDate(dates);
  const titulo1 = "Gonzalera Ranch";

  const theme = useTheme();

  return (
    <Surface style={styles.container}>
      <Subheading style={styles.title}>{titulo1}</Subheading>
      <Subheading style={styles.title}>{titulo}</Subheading>
      <Divider style={{ backgroundColor: "gray", marginTop: 10 }} />
      <ScrollView>
        <List.Section
          style={{
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <Text style={styles.title1}>{`Animal Id: ${animal.id}`}</Text>
          <Text style={styles.title1}>{`Name: ${animal.name}`}</Text>
          <Text
            style={styles.title1}
          >{`Clase: ${animal.clase_id} ${animal.clase}`}</Text>
          <Text style={styles.title1}>{`Mother: ${animal.mother}`}</Text>
          <Text style={styles.title1}>{`Owner: ${animal.owner}`}</Text>
          <Text style={styles.title1}>{`Birthdate: ${convertDate(
            animal.birthdate
          )}`}</Text>
          <HTMLView value={`Infos: ${animal.info}`} stylesheet={styles.p} />

          <Image
            source={{ uri: BASE_URL_IMAGES + `${animal.id}` + ".jpg" }}
            style={[
              styles.image,
              {
                borderColor: "gray",
              },
            ]}
          />
          <Image
            source={{ uri: BASE_URL_IMAGES + `${animal.id}` + "_1.jpg" }}
            style={[
              styles.image,
              {
                borderColor: "gray",
              },
            ]}
          />

          <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
          <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
        </List.Section>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D5DBDB",
    height: 30,
    fontSize: 18,
  },
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
    marginTop: 1,
    marginBottom: 1,
  },
  p: {
    fontSize: 38,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 3,
    marginLeft: 3,
  },
  title: {
    marginTop: 5,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0F7694",
    borderRadius: 3,
  },
  title11: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: "blue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  label: {
    paddingVertical: 5,
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    borderRadius: 20,
    width: "100%",
    height: 240,
  },
});
