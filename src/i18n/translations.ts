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
    checkLabel: string;
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
    checkLabel: '確認項目',
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
    checkLabel: 'Check item',
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
