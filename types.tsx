/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  ModalBitacora: [author_id: number, bitacora_date: string];
  ModalBitaEventsAdd: [
    bitacora_id: number,
    tipo_event_id: number,
    events_id: number,
    event_date: string,
    event: string,
    tipoevent: string,
    description: string
  ];
  ModalEvents: [
    bitacora_id: number,
    tipo_event_id: number,
    events_id: number,
    event_date: string,
    event: string,
    tipoevent: string,
    description: string
  ];

  ModalAnimalEdit: [
    id: number,
    name: string,
    birthdate: string,
    owner_id: number,
    clase_id: number,
    tipopart: string,
    hierro: string,
    mother: string,
    info: string,
    alive: string,
    owner: string,
    clase: number
  ];

  ModalAnimalView: [
    id: number,
    name: string,
    birthdate: string,
    owner_id: number,
    clase_id: number,
    tipopart: string,
    hierro: string,
    mother: string,
    info: string,
    alive: string,
    owner: string,
    clase: number
  ];
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Bitacoras: undefined;
  ModalBitacora: [author_id: number, bitacora_date: string];
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
