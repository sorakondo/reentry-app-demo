import type { Lang, QuestionId } from '../types';

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
  checklist: {
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
    titleSafe: string;
    titleUnsafe: string;
    titleExpert: string;
    descSafe: string;
    descExpert: string;
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
  };
  expertRequest: {
    title: string;
    subtitle: string;
    buildingNameLabel: string;
    checkedAtLabel: string;
    gasAlarmLabel: string;
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
    sendButton: string;
    sendingButton: string;
    backButton: string;
  };
  expertSent: {
    title: string;
    desc: string;
    caseNumberLabel: string;
    demoNote: string;
    backHomeButton: string;
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
  checklist: {
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: '重要項目',
    answerYes: 'はい',
    answerYesHint: '危険なし',
    answerNo: 'いいえ',
    answerNoHint: '危険あり',
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
      text: '建物が明らかに傾いていませんか？',
      shortLabel: '建物の傾き',
      dangerDescription: '建物の傾きなど、外観上の異常がある可能性があります',
      unknownBaseText:
        '建物の傾きについて、外観からの確認だけでは現場で安全性を判断できませんでした。',
    },
    q2_crack: {
      text: '柱や梁に大きなひび割れ・損傷がありませんか？',
      shortLabel: '柱・梁の損傷',
      dangerDescription: '柱・梁に危険がある可能性があります',
      unknownBaseText:
        '柱・梁について、損傷の有無や程度を現場で判断できませんでした。',
    },
    q3_ceiling: {
      text: '天井や壁に大きな落下・崩落の危険がありませんか？',
      shortLabel: '天井・壁の落下危険',
      dangerDescription: '天井や壁の落下・崩落の危険がある可能性があります',
      unknownBaseText:
        '天井・壁の落下・崩落の危険について、現場で安全性を判断できませんでした。',
    },
    q4_fire: {
      text: '建物内に火災、煙、浸水などの明らかな危険がありませんか？',
      shortLabel: '火災・煙・浸水',
      dangerDescription: '火災・煙・浸水などの危険がある可能性があります',
      unknownBaseText:
        '火災・煙・浸水などの危険について、現場で安全性を判断できませんでした。',
    },
    q5_gas: {
      text: '建物内または建物周辺からガス臭がしませんか？',
      shortLabel: 'ガス臭の有無',
      dangerDescription:
        'ガス臭が確認されており、ガス漏れの危険がある可能性があります',
      unknownBaseText:
        'ガス臭の有無について、現場で安全性を判断できませんでした。ガスに関する項目のため特に慎重な確認が必要です。',
    },
  },
  result: {
    titleSafe: '再入場可能',
    titleUnsafe: '再入場しないでください',
    titleExpert: '専門家による確認が必要です',
    descSafe: '今回の確認項目では、明らかな危険は確認されませんでした。',
    descExpert: '現場では安全性を確認できなかった項目があります。',
    dangerSectionTitle: '確認された危険',
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
  },
  expertRequest: {
    title: '専門家への確認依頼',
    subtitle:
      '入力内容をもとに、相談内容を自動的に整理しました。内容を確認して送信してください。',
    buildingNameLabel: '建物名',
    checkedAtLabel: '確認日時',
    gasAlarmLabel: 'ガス漏れ警報器',
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
    extraCommentLabel: '追加で伝えたいこと（任意）',
    extraCommentPlaceholder: '例：結果は「再入場可能」だったが、念のため確認してほしい',
    sendButton: '専門家へ送信',
    sendingButton: '送信中…',
    backButton: '結果画面に戻る',
  },
  expertSent: {
    title: '専門家への確認依頼を送信しました',
    desc: '専門家からの確認結果をお待ちください。現場での判断が難しい場合は、無理をせず建物には立ち入らないでください。',
    caseNumberLabel: '受付番号',
    demoNote: 'これは研究発表用のデモです。実際に専門家へ送信・通信は行われていません。',
    backHomeButton: 'ホームに戻る',
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
  checklist: {
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: 'Important',
    answerYes: 'Yes',
    answerYesHint: 'No danger',
    answerNo: 'No',
    answerNoHint: 'Danger present',
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
      text: 'Is the building clearly NOT tilting?',
      shortLabel: 'Building tilt',
      dangerDescription: 'There may be a visible abnormality such as a building tilt',
      unknownBaseText:
        'Whether the building is tilting could not be judged on site from a visual check alone.',
    },
    q2_crack: {
      text: 'Are there NO major cracks or damage to columns or beams?',
      shortLabel: 'Column / beam damage',
      dangerDescription: 'There may be danger from damaged columns or beams',
      unknownBaseText:
        'Whether the columns or beams are damaged, and how severely, could not be judged on site.',
    },
    q3_ceiling: {
      text: 'Is there NO major risk of the ceiling or walls collapsing or falling?',
      shortLabel: 'Ceiling / wall collapse risk',
      dangerDescription: 'There may be a risk of the ceiling or walls collapsing or falling',
      unknownBaseText:
        'The risk of the ceiling or walls collapsing or falling could not be judged on site.',
    },
    q4_fire: {
      text: 'Is there NO obvious danger such as fire, smoke, or flooding inside the building?',
      shortLabel: 'Fire / smoke / flooding',
      dangerDescription: 'There may be danger from fire, smoke, or flooding',
      unknownBaseText:
        'Whether there is danger from fire, smoke, or flooding could not be judged on site.',
    },
    q5_gas: {
      text: 'Is there NO smell of gas in or around the building?',
      shortLabel: 'Gas odor',
      dangerDescription:
        'A gas odor has been detected, and there may be a risk of a gas leak',
      unknownBaseText:
        'Whether there is a gas odor could not be judged on site. Since this concerns gas, extra caution is needed.',
    },
  },
  result: {
    titleSafe: 'Re-Entry Allowed',
    titleUnsafe: 'Do Not Re-Enter',
    titleExpert: 'Expert Review Required',
    descSafe: 'No obvious danger was found in this check.',
    descExpert: 'Some items could not be confirmed safe on site.',
    dangerSectionTitle: 'Hazards found',
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
  },
  expertRequest: {
    title: 'Expert Consultation Request',
    subtitle:
      'The consultation message below was organized automatically from your answers. Please review it before sending.',
    buildingNameLabel: 'Building',
    checkedAtLabel: 'Checked at',
    gasAlarmLabel: 'Gas leak detector',
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
    extraCommentLabel: 'Additional notes (optional)',
    extraCommentPlaceholder:
      'e.g., The result was "Re-Entry Allowed", but I would still like it double-checked.',
    sendButton: 'Send to Expert',
    sendingButton: 'Sending…',
    backButton: 'Back to results',
  },
  expertSent: {
    title: 'Your request has been sent to an expert',
    desc: 'Please wait for the expert to respond. If it is hard to judge on site, do not force entry into the building.',
    caseNumberLabel: 'Reference number',
    demoNote:
      'This is a demo for a research presentation. No request was actually sent to an expert.',
    backHomeButton: 'Back to Home',
  },
};

export const translations: Record<Lang, Translation> = { ja, en };
export type { Translation };
