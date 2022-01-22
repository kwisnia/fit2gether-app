import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCodeSurface from "../components/buddy/QRCodeSurface";
import YourBuddySurface from "../components/buddy/YourBuddySurface";
import { PairInfo } from "../types/PairInfo";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScannedCallback } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { ConnectionResponse } from "../types/ConnectionResponse";
import { SessionContext } from "../context/SessionContext";
import { TabContext } from "../context/TabContext";

const BuddySystemScreen: React.FunctionComponent = () => {
    const [pairInfo, setPairInfo] = React.useState<PairInfo | null>(null);
    const isFocused = useIsFocused();
    const [sessionInfo, refreshSessionInfo, updateSessionInfo] =
        useContext(SessionContext);
    const [scanning, setScanning] = React.useState(false);
    const [scanned, setScanned] = React.useState(false);
    const { setTab } = React.useContext(TabContext);

    React.useEffect(() => {
        if (sessionInfo?.buddyId) {
            const fetchPairInfo = async () => {
                const pair: AxiosResponse<PairInfo> = await axios.get(
                    "/pairInfo"
                );
                setPairInfo(pair.data);
            };
            void fetchPairInfo();
        }
    }, [sessionInfo]);

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
            setTab("Buddy System");
        }
    }, [isFocused, refreshSessionInfo, setTab]);

    const handleBarCodeScanned: BarCodeScannedCallback = async ({ data }) => {
        if (!scanned) {
            setScanned(true);
            setScanning(false);
            const inviteCode = data.substring(11);
            const res: AxiosResponse<ConnectionResponse> = await axios.post(
                `/connect/${inviteCode}`
            );
            const pair: AxiosResponse<PairInfo> = await axios.get("/pairInfo");
            setPairInfo(pair.data);
            if (sessionInfo) {
                updateSessionInfo({
                    ...sessionInfo,
                    buddyId: res.data.buddyId,
                    buddyProfilePicture: res.data.buddyProfilePicture,
                    token: {
                        ...sessionInfo.token,
                        accessToken: res.data.accessToken,
                    },
                });
            }
        }
    };

    return (
        <SafeAreaView>
            <QRCodeSurface />
            <YourBuddySurface
                buddy={pairInfo?.buddyName || null}
                setScanning={setScanning}
            />
            {scanning ? (
                <Camera
                    onBarCodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"],
                    }}
                    style={{ ...StyleSheet.absoluteFillObject, elevation: 999 }}
                />
            ) : null}
        </SafeAreaView>
    );
};

export default BuddySystemScreen;
