import type { Lang, QuestionId, StructureType } from '../types';

interface QuestionText {
  text: string;
  shortLabel: string;
  dangerDescription: string;
  unknownBaseText: string;
}

interface Translation {
  common: {
    langToggleLabel: string;
    buildingName: string;
  };
  home: {
    appTitle: string;
    appSubtitle: string;
    buildingNameLabel: string;
    checkedAtLabel: string;
    gasAlarmSectionTitle: string;
    gasAlarmNormal: string;
    gasAlarmAlarm: string;
    gasAlarmNormalDesc: string;
    gasAlarmAlarmDesc: string;
    gasLevelLabel: string;
    gasLevelNormal: string;
    gasLevelAbnormal: string;
    lastUpdatedLabel: string;
    disclaimer: string;
    startButton: string;
    devPanelOpen: string;
    devPanelClose: string;
    devPanelDesc: string;
    toggleAlarmButton: (statusLabel: string) => string;
    relativeJustNow: string;
    relativeSecondsAgo: (n: number) => string;
    relativeMinutesAgo: (n: number) => string;
  };
  seismic: {
    sectionTitle: string;
    scaleLabel: (scale: number | null) => string;
    statusLoading: string;
    statusAutoObservedAt: string;
    statusNoData: string;
    statusFailed: string;
    sourceAutoBadge: string;
    sourceManualBadge: string;
    areaUnknown: string;
    retryButton: string;
    manualToggleOn: string;
    manualToggleOff: string;
    manualScaleLabel: string;
    manualAreaLabel: string;
    manualAreaPlaceholder: string;
    manualNotSet: string;
  };
  expertCapacity: {
    sectionTitle: string;
    unitSeparator: string;
    description: string;
    statusAvailable: string;
    statusModerate: string;
    statusCongested: string;
  };
  buildingInfo: {
    sectionTitle: string;
    settingsButton: string;
    modalTitle: string;
    modalDesc: string;
    ageLabel: string;
    ageUnit: string;
    locationLabel: string;
    locationPlaceholder: string;
    floorsLabel: string;
    floorsUnit: string;
    structureTypeLabel: string;
    structureTypeOptions: Record<StructureType, string>;
    floorAreaLabel: string;
    floorAreaUnit: string;
    notSet: string;
    saveButton: string;
    cancelButton: string;
  };
  checklist: {
    checkLabel: string;
    progress: (index: number, total: number) => string;
    importantBadge: string;
    answerYes: string;
    answerYesHint: string;
    answerNo: string;
    answerNoHint: string;
    answerUnknown: string;
    answerUnknownHint: string;
    commentLabel: string;
    commentPlaceholder: string;
    commentNote: string;
    backButton: string;
    nextButton: string;
    finishButton: string;
  };
  questions: Record<QuestionId, QuestionText>;
  result: {
    titleRoutine: string;
    titleTargeted: string;
    titleExpert: string;
    titleHold: string;
    descRoutine: string;
    descTargeted: string;
    descExpert: string;
    descHold: string;
    targetedSectionTitle: string;
    targetedItemSuffix: string;
    dangerSectionTitle: string;
    gasAlarmReasonText: string;
    unknownSectionTitle: string;
    unknownItemSuffix: string;
    disclaimerSafe: string;
    disclaimerGeneral: string;
    consultExpertButton: string;
    restartButton: string;
    askExpertPrompt: string;
    askExpertButton: string;
    saveResultButton: string;
    savedBadge: string;
    recordIdLabel: string;
    savedAtLabel: string;
    autoNoteLabel: string;
  };
  expertRequest: {
    title: string;
    subtitle: string;
    buildingNameLabel: string;
    checkedAtLabel: string;
    gasAlarmLabel: string;
    seismicLabel: string;
    fieldResultSectionTitle: string;
    noUnknownItemsText: string;
    unknownSuffix: string;
    autoSummaryBadge: string;
    autoSummarySectionTitle: string;
    noExtraCommentText: string;
    overallSummary: (unknownCount: number) => string;
    overallSummaryNoUnknown: string;
    extraCommentLabel: string;
    extraCommentPlaceholder: string;
    callButton: string;
    connectingButton: string;
    backButton: string;
  };
  expertCall: {
    liveBadge: string;
    title: string;
    expertLabel: string;
    expertRole: string;
    selfLabel: string;
    waitingNote: string;
    callIdLabel: string;
    buildingLabel: string;
    demoNote: string;
    endCallButton: string;
    photoSectionTitle: string;
    photoSectionDesc: string;
    selectPhotoButton: string;
    photoSending: string;
    photoSent: string;
    photoRemoveLabel: string;
    photoDemoNote: string;
    recordIdLabel: string;
    signatureSectionTitle: string;
    signatureSectionDesc: string;
    signButton: string;
    signedStatus: string;
    unsignedStatus: string;
    signedAtLabel: string;
    signatureModalTitle: string;
    signaturePlaceholder: string;
    clearButton: string;
    completeSignButton: string;
    cancelButton: string;
  };
}

const ja: Translation = {
  common: {
    langToggleLabel: 'English',
    buildingName: '○○ビル',
  },
  home: {
    appTitle: '災害後 建物再入場確認',
    appSubtitle: '建物の安全状態を確認します',
    buildingNameLabel: '建物名',
    checkedAtLabel: '確認日時',
    gasAlarmSectionTitle: 'ガス漏れ警報器',
    gasAlarmNormal: '正常',
    gasAlarmAlarm: 'ガス漏れ警報',
    gasAlarmNormalDesc: '警報器からの最新データを受信しています',
    gasAlarmAlarmDesc: '警報器が異常を検知しています。ただちに避難してください。',
    gasLevelLabel: 'ガス濃度',
    gasLevelNormal: '正常範囲',
    gasLevelAbnormal: '異常濃度を検知',
    lastUpdatedLabel: '最終受信',
    disclaimer:
      'このシステムは建物の安全性を最終的に保証するものではありません。危険を感じた場合は建物に立ち入らないでください。',
    startButton: '確認を開始',
    devPanelOpen: '研究用デモ操作パネル',
    devPanelClose: '研究用デモ操作パネルを閉じる',
    devPanelDesc:
      '発表デモ用：ガス漏れ警報器の状態を切り替えます（実際のセンサーとは連動しません）。「最初からやり直す」を押すと自動的に「正常」に戻ります。',
    toggleAlarmButton: (statusLabel) => `警報器状態を切り替える（現在：${statusLabel}）`,
    relativeJustNow: 'たった今',
    relativeSecondsAgo: (n) => `${n}秒前`,
    relativeMinutesAgo: (n) => `${n}分前`,
  },
  seismic: {
    sectionTitle: '周辺の震度情報',
    scaleLabel: (scale) => {
      const labels: Record<number, string> = {
        0: '震度0',
        10: '震度1',
        20: '震度2',
        30: '震度3',
        40: '震度4',
        45: '震度5弱',
        46: '震度5弱以上（未確定）',
        50: '震度5強',
        55: '震度6弱',
        60: '震度6強',
        70: '震度7',
      };
      if (scale === null) return '不明';
      return labels[scale] ?? '不明';
    },
    statusLoading: '位置情報から震度情報を取得しています…',
    statusAutoObservedAt: '取得日時',
    statusNoData: '直近の震度情報の報告はありません',
    statusFailed: '震度情報を自動取得できませんでした。手動で入力してください。',
    sourceAutoBadge: '自動取得',
    sourceManualBadge: '手動入力',
    areaUnknown: '地域不明',
    retryButton: '自動取得をやり直す',
    manualToggleOn: '手動で入力する',
    manualToggleOff: '自動取得に戻す',
    manualScaleLabel: '震度',
    manualAreaLabel: '地域名（任意）',
    manualAreaPlaceholder: '例：○○市○○区',
    manualNotSet: '未入力',
  },
  expertCapacity: {
    sectionTitle: '専門家テレビ電話 対応状況',
    unitSeparator: '/',
    description: '現在対応中の相談件数です',
    statusAvailable: '空きがあります。すぐに接続できます。',
    statusModerate: 'やや混雑しています。',
    statusCongested: '混雑しています。接続までお待ちいただく場合があります。',
  },
  buildingInfo: {
    sectionTitle: '建物・現場情報',
    settingsButton: '設定',
    modalTitle: '建物情報の設定',
    modalDesc: '建物の基本情報を入力してください（デモ用にあらかじめ入力されています）。',
    ageLabel: '築年数',
    ageUnit: '年',
    locationLabel: '所在地',
    locationPlaceholder: '例：東京都千代田区丸の内1-1-1',
    floorsLabel: '階数',
    floorsUnit: '階建て',
    structureTypeLabel: '構造種別',
    structureTypeOptions: {
      RC: 'RC造（鉄筋コンクリート造）',
      S: 'S造（鉄骨造）',
      wood: '木造',
      other: 'その他',
    },
    floorAreaLabel: '延床面積',
    floorAreaUnit: 'm²',
    notSet: '未設定',
    saveButton: '保存する',
    cancelButton: 'キャンセル',
  },
  checklist: {
    checkLabel: '確認項目',
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: '重要項目',
    answerYes: 'はい',
    answerYesHint: '危険あり',
    answerNo: 'いいえ',
    answerNoHint: '危険なし',
    answerUnknown: '判断できない',
    answerUnknownHint: '現場では確認できない',
    commentLabel: '状況を入力してください（任意）',
    commentPlaceholder:
      '例：1階の柱にひび割れがあるように見えるが、損傷の程度を判断できない',
    commentNote: '入力内容は専門家への相談内容として使用されます。',
    backButton: '戻る',
    nextButton: '次へ',
    finishButton: '結果を見る',
  },
  questions: {
    q1_tilt: {
      text: '建物に明らかな傾き・沈下がありませんか？',
      shortLabel: '建物の傾き',
      dangerDescription: '建物の傾きなど、外観上の異常がある可能性があります',
      unknownBaseText:
        '建物の傾きについて、外観からの確認だけでは現場で安全性を判断できませんでした。',
    },
    q2_crack: {
      text: '主要構造部に重大なひび割れ・損傷がありませんか？',
      shortLabel: '柱・梁の損傷',
      dangerDescription: '柱・梁に危険がある可能性があります',
      unknownBaseText:
        '柱・梁について、損傷の有無や程度を現場で判断できませんでした。',
    },
    q3_adjacent: {
      text: '隣接建物・地盤に危険な変状がありませんか？',
      shortLabel: '隣接建物・地盤の危険',
      dangerDescription: '隣接建物・地盤に危険な変状がある可能性があります',
      unknownBaseText: '隣接建物・地盤の状態を現場で判断できませんでした。',
    },
    q4_monitoring: {
      text: '構造モニタリングが正常で、最新データを受信していますか？',
      shortLabel: '構造モニタリング',
      dangerDescription: '構造モニタリングに異常がある可能性があります',
      unknownBaseText: '構造モニタリングの状態を現場で判断できませんでした。',
    },
    q5_ceiling: {
      text: '天井に落下・崩落の兆候がありませんか？',
      shortLabel: '天井の損傷',
      dangerDescription: '天井に落下・崩落の危険がある可能性があります',
      unknownBaseText: '天井の落下・崩落の危険を現場で判断できませんでした。',
    },
    q6_glass: {
      text: 'ガラスやその他の落下物による危険がありませんか？',
      shortLabel: 'ガラス・落下物の危険',
      dangerDescription: 'ガラス・落下物による危険がある可能性があります',
      unknownBaseText: 'ガラス・落下物の危険を現場で判断できませんでした。',
    },
    q7_exit: {
      text: '非常階段・出口を安全に利用できますか？',
      shortLabel: '非常階段・出口',
      dangerDescription: '非常階段・出口を利用できない可能性があります',
      unknownBaseText: '非常階段・出口の利用可否を現場で判断できませんでした。',
    },
    q8_gas: {
      text: 'ガスの状態が正常で、ガス臭や警報がありませんか？',
      shortLabel: 'ガスの状態',
      dangerDescription: 'ガス漏れの危険がある可能性があります',
      unknownBaseText: 'ガスの状態を現場で判断できませんでした。特に慎重な確認が必要です。',
    },
    q9_fire: {
      text: '火災警報・消火設備に異常がありませんか？',
      shortLabel: '火災警報・消防設備',
      dangerDescription: '火災警報・消防設備に異常がある可能性があります',
      unknownBaseText: '火災警報・消防設備の状態を現場で判断できませんでした。',
    },
    q10_elevator: {
      text: 'エレベーターの停止状況を把握し、閉じ込められた人がいませんか？',
      shortLabel: 'エレベーター・閉じ込め',
      dangerDescription: 'エレベーターの停止や閉じ込めの危険があります',
      unknownBaseText: 'エレベーターの停止・閉じ込め状況を現場で判断できませんでした。',
    },
    q11_power: {
      text: '電力の状態が把握でき、通電による危険がありませんか？',
      shortLabel: '電力の状態',
      dangerDescription: '電力の停止・通電による追加確認が必要です',
      unknownBaseText: '電力の状態を現場で判断できませんでした。',
    },
    q12_missing_data: {
      text: '安全判定に必要な重要データがそろっていますか？',
      shortLabel: '重要データの不足',
      dangerDescription: '安全判定に必要な重要データが不足しています',
      unknownBaseText: '安全判定に必要な重要データの有無を判断できませんでした。',
    },
  },
  result: {
    titleRoutine: 'Routine Check',
    titleTargeted: 'Targeted Check',
    titleExpert: 'Expert Review',
    titleHold: 'HOLD',
    descRoutine: '今回の関連項目はすべて正常でした。',
    descTargeted: '一部の設備・内装項目に追加確認が必要です。',
    descExpert: '構造・重要項目を現場だけでは判断できません。',
    descHold: '重大な危険または安全判定を止める状態を検知しました。',
    targetedSectionTitle: '追加確認が必要な項目',
    targetedItemSuffix: '：追加確認',
    dangerSectionTitle: 'HOLDの理由',
    gasAlarmReasonText: 'ガス漏れ警報器が警報を検知しています',
    unknownSectionTitle: '判断できなかった項目',
    unknownItemSuffix: '：判断できない',
    disclaimerSafe: 'この結果は建物の安全性を保証するものではありません。',
    disclaimerGeneral:
      'このシステムは建物の安全性を最終的に保証するものではありません。危険を感じた場合は建物に立ち入らないでください。',
    consultExpertButton: '専門家への相談内容を確認',
    restartButton: '最初からやり直す',
    askExpertPrompt: '判断に迷う場合や不安な点がある場合は、専門家に相談することもできます。',
    askExpertButton: '専門家に相談する',
    saveResultButton: '確認結果をアプリに保存',
    savedBadge: '保存済み',
    recordIdLabel: '記録ID',
    savedAtLabel: '保存日時',
    autoNoteLabel: '自動整理メモ',
  },
  expertRequest: {
    title: '専門家への確認依頼',
    subtitle:
      '入力内容をもとに、相談内容を自動的に整理しました。内容を確認のうえ、専門家とのビデオ通話を開始してください。',
    buildingNameLabel: '建物名',
    checkedAtLabel: '確認日時',
    gasAlarmLabel: 'ガス漏れ警報器',
    seismicLabel: '周辺の震度',
    fieldResultSectionTitle: '現場確認結果',
    noUnknownItemsText: '現場で判断できなかった項目はありません。',
    unknownSuffix: '：判断できない',
    autoSummaryBadge: '自動整理（デモ）',
    autoSummarySectionTitle: '専門家への相談内容',
    noExtraCommentText: '現場からの追加情報なし',
    overallSummary: (unknownCount) =>
      `現場確認の結果、${unknownCount}件の項目について、現場の担当者だけでは安全性を判断できませんでした。恐れ入りますが、下記の内容をご確認のうえ、再入場の可否についてご判断をお願いいたします。`,
    overallSummaryNoUnknown:
      '現場確認では判断できなかった項目はありませんでしたが、現場の担当者が判断に迷う点があるため、念のため専門家のご確認をお願いいたします。',
    extraCommentLabel: '通話で伝えたいこと（任意）',
    extraCommentPlaceholder: '例：結果は「再入場可能」だったが、念のため確認してほしい',
    callButton: '専門家とビデオ通話をつなぐ',
    connectingButton: '接続中…',
    backButton: '結果画面に戻る',
  },
  expertCall: {
    liveBadge: '通話中',
    title: '専門家とビデオ通話中',
    expertLabel: '専門家',
    expertRole: '建物構造の専門家（オンライン）',
    selfLabel: 'あなた（現場）',
    waitingNote: '専門家が状況を確認しています。現在の状況を落ち着いてお伝えください。',
    callIdLabel: '通話ID',
    buildingLabel: '建物名',
    demoNote: 'これは研究発表用のデモです。実際のビデオ通話は行われていません。',
    endCallButton: '通話を終了してホームに戻る',
    photoSectionTitle: '専門家へ写真を送る',
    photoSectionDesc: '現場の状況が伝わる写真があれば、通話中に専門家へ送ることができます。',
    selectPhotoButton: '写真を選択して送る',
    photoSending: '送信中…',
    photoSent: '送信済み',
    photoRemoveLabel: '写真を削除',
    photoDemoNote: 'これはデモのため、実際には専門家へ送信されません。',
    recordIdLabel: '記録ID',
    signatureSectionTitle: '確認完了の署名',
    signatureSectionDesc: '確認が完了したら、下記に署名してください。',
    signButton: '署名する',
    signedStatus: '署名済み',
    unsignedStatus: '未署名',
    signedAtLabel: '署名日時',
    signatureModalTitle: '署名',
    signaturePlaceholder: '枠内に指またはマウスで署名してください',
    clearButton: 'クリア',
    completeSignButton: '署名して完了',
    cancelButton: 'キャンセル',
  },
};

const en: Translation = {
  common: {
    langToggleLabel: '日本語',
    buildingName: 'Building A',
  },
  home: {
    appTitle: 'Post-Disaster Re-Entry Check',
    appSubtitle: "Check the building's safety status",
    buildingNameLabel: 'Building',
    checkedAtLabel: 'Checked at',
    gasAlarmSectionTitle: 'Gas Leak Detector',
    gasAlarmNormal: 'Normal',
    gasAlarmAlarm: 'Gas Leak Alarm',
    gasAlarmNormalDesc: 'Receiving the latest data from the detector',
    gasAlarmAlarmDesc:
      'The detector has detected an abnormality. Evacuate immediately.',
    gasLevelLabel: 'Gas level',
    gasLevelNormal: 'Normal range',
    gasLevelAbnormal: 'Abnormal level detected',
    lastUpdatedLabel: 'Last received',
    disclaimer:
      'This system does not ultimately guarantee the safety of the building. If you sense danger, do not enter the building.',
    startButton: 'Start Check',
    devPanelOpen: 'Research demo control panel',
    devPanelClose: 'Close demo control panel',
    devPanelDesc:
      'For presentation demos: toggle the gas leak detector state (not linked to a real sensor). It automatically resets to "Normal" when you press "Start Over".',
    toggleAlarmButton: (statusLabel) => `Toggle detector state (current: ${statusLabel})`,
    relativeJustNow: 'just now',
    relativeSecondsAgo: (n) => `${n}s ago`,
    relativeMinutesAgo: (n) => `${n}m ago`,
  },
  seismic: {
    sectionTitle: 'Nearby Seismic Intensity',
    scaleLabel: (scale) => {
      const labels: Record<number, string> = {
        0: 'Intensity 0',
        10: 'Intensity 1',
        20: 'Intensity 2',
        30: 'Intensity 3',
        40: 'Intensity 4',
        45: 'Intensity 5 Lower',
        46: 'Intensity 5+ (unconfirmed)',
        50: 'Intensity 5 Upper',
        55: 'Intensity 6 Lower',
        60: 'Intensity 6 Upper',
        70: 'Intensity 7',
      };
      if (scale === null) return 'Unknown';
      return labels[scale] ?? 'Unknown';
    },
    statusLoading: 'Fetching seismic intensity from your location…',
    statusAutoObservedAt: 'Retrieved at',
    statusNoData: 'No recent seismic intensity reports nearby',
    statusFailed: 'Could not automatically retrieve seismic data. Please enter it manually.',
    sourceAutoBadge: 'Auto',
    sourceManualBadge: 'Manual',
    areaUnknown: 'Unknown area',
    retryButton: 'Retry automatic detection',
    manualToggleOn: 'Enter manually',
    manualToggleOff: 'Use automatic detection',
    manualScaleLabel: 'Seismic intensity',
    manualAreaLabel: 'Area name (optional)',
    manualAreaPlaceholder: 'e.g., City / Ward name',
    manualNotSet: 'Not set',
  },
  expertCapacity: {
    sectionTitle: 'Expert Video Call Availability',
    unitSeparator: '/',
    description: 'Consultations currently in progress',
    statusAvailable: 'Available — you can connect right away.',
    statusModerate: 'Moderately busy right now.',
    statusCongested: 'Busy — you may need to wait to connect.',
  },
  buildingInfo: {
    sectionTitle: 'Building & Site Info',
    settingsButton: 'Settings',
    modalTitle: 'Building Information Settings',
    modalDesc: "Enter the building's basic information (pre-filled for this demo).",
    ageLabel: 'Building age',
    ageUnit: 'yr',
    locationLabel: 'Location',
    locationPlaceholder: 'e.g., 1-1-1 Marunouchi, Chiyoda-ku, Tokyo',
    floorsLabel: 'Floors',
    floorsUnit: 'floors',
    structureTypeLabel: 'Structure type',
    structureTypeOptions: {
      RC: 'RC (Reinforced Concrete)',
      S: 'S (Steel)',
      wood: 'Wood',
      other: 'Other',
    },
    floorAreaLabel: 'Total floor area',
    floorAreaUnit: 'm²',
    notSet: 'Not set',
    saveButton: 'Save',
    cancelButton: 'Cancel',
  },
  checklist: {
    checkLabel: 'Check item',
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: 'Important',
    answerYes: 'Yes',
    answerYesHint: 'Danger present',
    answerNo: 'No',
    answerNoHint: 'No danger',
    answerUnknown: "Can't tell",
    answerUnknownHint: 'Cannot confirm on site',
    commentLabel: 'Describe the situation (optional)',
    commentPlaceholder:
      'e.g., A crack is visible on a 1st-floor column, but I cannot judge how severe it is.',
    commentNote: 'What you enter here will be used in the consultation message to the expert.',
    backButton: 'Back',
    nextButton: 'Next',
    finishButton: 'See Result',
  },
  questions: {
    q1_tilt: {
      text: 'Is the building clearly NOT tilting or settling?',
      shortLabel: 'Building tilt',
      dangerDescription: 'There may be a visible abnormality such as a building tilt',
      unknownBaseText:
        'Whether the building is tilting could not be judged on site from a visual check alone.',
    },
    q2_crack: {
      text: 'Are there NO major cracks or damage to primary structural members?',
      shortLabel: 'Column / beam damage',
      dangerDescription: 'There may be danger from damaged columns or beams',
      unknownBaseText:
        'Whether the columns or beams are damaged, and how severely, could not be judged on site.',
    },
    q3_adjacent: {
      text: 'Are there NO dangerous changes to adjacent buildings or the ground?',
      shortLabel: 'Adjacent / ground hazard',
      dangerDescription: 'Adjacent buildings or the ground may have a dangerous change',
      unknownBaseText: 'The condition of adjacent buildings or the ground could not be judged on site.',
    },
    q4_monitoring: {
      text: 'Is structural monitoring normal, with the latest data received?',
      shortLabel: 'Structural monitoring',
      dangerDescription: 'Structural monitoring may be abnormal',
      unknownBaseText: 'The status of structural monitoring could not be judged on site.',
    },
    q5_ceiling: {
      text: 'Are there NO signs of ceiling damage or collapse?',
      shortLabel: 'Ceiling damage',
      dangerDescription: 'There may be a risk of ceiling damage or collapse',
      unknownBaseText: 'The risk of ceiling damage or collapse could not be judged on site.',
    },
    q6_glass: {
      text: 'Is there NO hazard from glass or other falling objects?',
      shortLabel: 'Glass / falling objects',
      dangerDescription: 'There may be a glass or falling-object hazard',
      unknownBaseText: 'The glass or falling-object hazard could not be judged on site.',
    },
    q7_exit: {
      text: 'Are emergency stairs and exits safe to use?',
      shortLabel: 'Emergency stairs / exits',
      dangerDescription: 'Emergency stairs or exits may not be usable',
      unknownBaseText: 'Whether emergency stairs or exits are usable could not be judged on site.',
    },
    q8_gas: {
      text: 'Is the gas status normal, with no odor or alarm?',
      shortLabel: 'Gas status',
      dangerDescription: 'There may be a gas leak hazard',
      unknownBaseText: 'The gas status could not be judged on site. Extra caution is needed.',
    },
    q9_fire: {
      text: 'Are fire alarms and fire-protection systems operating normally?',
      shortLabel: 'Fire alarm / fire protection',
      dangerDescription: 'Fire alarms or fire-protection systems may be abnormal',
      unknownBaseText: 'The status of fire alarms or fire-protection systems could not be judged on site.',
    },
    q10_elevator: {
      text: 'Is the elevator status known, with no person trapped inside?',
      shortLabel: 'Elevator / trapped person',
      dangerDescription: 'There may be an elevator outage or trapped person',
      unknownBaseText: 'The elevator outage or trapped-person status could not be judged on site.',
    },
    q11_power: {
      text: 'Is the power status known, with no electrical hazard?',
      shortLabel: 'Power status',
      dangerDescription: 'Additional checks are needed for power or electrical hazards',
      unknownBaseText: 'The power status could not be judged on site.',
    },
    q12_missing_data: {
      text: 'Is all critical data needed for a safety decision available?',
      shortLabel: 'Missing critical data',
      dangerDescription: 'Critical data needed for a safety decision is missing',
      unknownBaseText: 'The availability of critical safety data could not be judged on site.',
    },
  },
  result: {
    titleRoutine: 'Routine Check',
    titleTargeted: 'Targeted Check',
    titleExpert: 'Expert Review',
    titleHold: 'HOLD',
    descRoutine: 'All relevant checks were normal.',
    descTargeted: 'A focused follow-up is needed for one or more systems or interior items.',
    descExpert: 'Structural or critical items cannot be judged on site alone.',
    descHold: 'A serious hazard or a stop condition for the safety decision was detected.',
    targetedSectionTitle: 'Items needing a focused follow-up',
    targetedItemSuffix: ': follow-up needed',
    dangerSectionTitle: 'Why HOLD',
    gasAlarmReasonText: 'The gas leak detector has detected an alarm',
    unknownSectionTitle: 'Items that could not be judged',
    unknownItemSuffix: ": Can't tell",
    disclaimerSafe: 'This result does not guarantee the safety of the building.',
    disclaimerGeneral:
      'This system does not ultimately guarantee the safety of the building. If you sense danger, do not enter the building.',
    consultExpertButton: 'Review consultation details for an expert',
    restartButton: 'Start Over',
    askExpertPrompt: "If you're unsure or feel uneasy about this result, you can also consult an expert.",
    askExpertButton: 'Consult an expert',
    saveResultButton: 'Save Confirmation Result to App',
    savedBadge: 'Saved',
    recordIdLabel: 'Record ID',
    savedAtLabel: 'Saved at',
    autoNoteLabel: 'Auto-summarized memo',
  },
  expertRequest: {
    title: 'Expert Consultation Request',
    subtitle:
      'The consultation message below was organized automatically from your answers. Please review it, then start a video call with an expert.',
    buildingNameLabel: 'Building',
    checkedAtLabel: 'Checked at',
    gasAlarmLabel: 'Gas leak detector',
    seismicLabel: 'Nearby seismic intensity',
    fieldResultSectionTitle: 'On-site check results',
    noUnknownItemsText: 'No items were left unable to be judged on site.',
    unknownSuffix: ": Can't tell",
    autoSummaryBadge: 'Auto-summarized (Demo)',
    autoSummarySectionTitle: 'Message to the expert',
    noExtraCommentText: 'No additional notes from the site',
    overallSummary: (unknownCount) =>
      `On-site staff were unable to judge the safety of ${unknownCount} item(s) during this check. Please review the details below and advise on whether re-entry is appropriate.`,
    overallSummaryNoUnknown:
      'No items were left unable to be judged during the on-site check, but the on-site staff would still like an expert to review the result, just to be safe.',
    extraCommentLabel: 'Anything you want to mention on the call (optional)',
    extraCommentPlaceholder:
      'e.g., The result was "Re-Entry Allowed", but I would still like it double-checked.',
    callButton: 'Start Video Call with Expert',
    connectingButton: 'Connecting…',
    backButton: 'Back to results',
  },
  expertCall: {
    liveBadge: 'Live',
    title: 'Video Call with Expert',
    expertLabel: 'Expert',
    expertRole: 'Structural safety expert (online)',
    selfLabel: 'You (on site)',
    waitingNote: 'The expert is reviewing the situation. Please describe the current state calmly.',
    callIdLabel: 'Call ID',
    buildingLabel: 'Building',
    demoNote:
      'This is a demo for a research presentation. No actual video call is taking place.',
    endCallButton: 'End call and return home',
    photoSectionTitle: 'Send Photos to the Expert',
    photoSectionDesc:
      'If you have photos that show the situation on site, you can send them to the expert during the call.',
    selectPhotoButton: 'Select & Send Photo',
    photoSending: 'Sending…',
    photoSent: 'Sent',
    photoRemoveLabel: 'Remove photo',
    photoDemoNote: 'This is a demo — photos are not actually sent to the expert.',
    recordIdLabel: 'Record ID',
    signatureSectionTitle: 'Completion Signature',
    signatureSectionDesc: 'Once the confirmation is complete, please sign below.',
    signButton: 'Sign',
    signedStatus: 'Signed',
    unsignedStatus: 'Not signed',
    signedAtLabel: 'Signed at',
    signatureModalTitle: 'Signature',
    signaturePlaceholder: 'Sign within the box using your finger or mouse',
    clearButton: 'Clear',
    completeSignButton: 'Sign & Complete',
    cancelButton: 'Cancel',
  },
};

export const translations: Record<Lang, Translation> = { ja, en };
export type { Translation };
