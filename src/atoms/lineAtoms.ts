import { atom } from "jotai";

export interface LineAccount {
  lineId: string;
  walletId: string;
  connectedAt: Date;
}

export const lineAccountAtom = atom<LineAccount | null>(null);
export const isLineConnectedAtom = atom<boolean>(false);
