import type { InternalLocale } from "../../i18n/locale-registry";
import type { LocalizedContentVersion, PublicationStatus } from "../content/types";

export type TranslationEvent = {
  id: string;
  contentId: string;
  locale: InternalLocale;
  from: PublicationStatus | null;
  to: PublicationStatus;
  createdAt: string;
  actor: string;
  note?: string;
  snapshot: LocalizedContentVersion;
};

export type TranslationRecord = {
  contentId: string;
  locale: InternalLocale;
  current: LocalizedContentVersion;
  history: TranslationEvent[];
};

const allowedTransitions: Readonly<Record<PublicationStatus, readonly PublicationStatus[]>> = {
  draft: ["generated", "localized", "archived"],
  generated: ["localized", "rejected", "archived"],
  localized: ["review_required", "generated", "rejected", "archived"],
  review_required: ["approved", "rejected", "localized", "archived"],
  approved: ["published", "review_required", "rejected", "archived"],
  published: ["approved", "localized", "archived"],
  rejected: ["localized", "generated", "archived"],
  archived: ["draft", "localized"]
};

export interface TranslationPipeline {
  transition(record: TranslationRecord, to: PublicationStatus, actor: string, note?: string): TranslationRecord;
  withdraw(record: TranslationRecord, actor: string, note?: string): TranslationRecord;
  relocalize(record: TranslationRecord, actor: string, note?: string): TranslationRecord;
}

function eventId(record: TranslationRecord, to: PublicationStatus): string {
  return `${record.contentId}:${record.locale}:${record.history.length + 1}:${to}`;
}

function updateStatus(version: LocalizedContentVersion, status: PublicationStatus, now: string): LocalizedContentVersion {
  return {
    ...version,
    translationStatus: status,
    reviewStatus: status,
    publishStatus: status,
    updatedAt: now,
    publishedAt: status === "published" ? version.publishedAt ?? now : undefined,
    version: version.version + 1
  };
}

export function createTranslationPipeline(now: () => string = () => new Date().toISOString()): TranslationPipeline {
  function transition(record: TranslationRecord, to: PublicationStatus, actor: string, note?: string): TranslationRecord {
    const from = record.current.publishStatus;
    if (!allowedTransitions[from].includes(to)) {
      throw new Error(`Invalid translation transition: ${from} -> ${to}`);
    }
    const createdAt = now();
    const current = updateStatus(record.current, to, createdAt);
    const event: TranslationEvent = {
      id: eventId(record, to),
      contentId: record.contentId,
      locale: record.locale,
      from,
      to,
      createdAt,
      actor,
      note,
      snapshot: current
    };
    return { ...record, current, history: [...record.history, event] };
  }

  return {
    transition,
    withdraw(record, actor, note) {
      if (record.current.publishStatus !== "published") {
        throw new Error("Only a published localization can be withdrawn");
      }
      return transition(record, "approved", actor, note ?? "Withdrawn from public routing");
    },
    relocalize(record, actor, note) {
      const status = record.current.publishStatus;
      if (!allowedTransitions[status].includes("localized")) {
        throw new Error(`Cannot relocalize from ${status}`);
      }
      return transition(record, "localized", actor, note ?? "Localization restarted");
    }
  };
}
