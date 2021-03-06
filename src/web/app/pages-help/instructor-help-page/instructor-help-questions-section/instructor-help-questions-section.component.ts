import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageScrollService } from 'ngx-page-scroll-core';
import {
  FeedbackParticipantType,
  FeedbackQuestionType, FeedbackVisibilityType,
  NumberOfEntitiesToGiveFeedbackToSetting,
} from '../../../../types/api-output';
import { DEFAULT_TEXT_QUESTION_DETAILS } from '../../../../types/default-question-structs';
import {
  QuestionEditFormMode,
  QuestionEditFormModel,
} from '../../../components/question-edit-form/question-edit-form-model';
import { InstructorHelpSectionComponent } from '../instructor-help-section.component';

/**
 * Questions Section of the Instructor Help Page.
 */
@Component({
  selector: 'tm-instructor-help-questions-section',
  templateUrl: './instructor-help-questions-section.component.html',
  styleUrls: ['./instructor-help-questions-section.component.scss'],
})
export class InstructorHelpQuestionsSectionComponent extends InstructorHelpSectionComponent implements OnInit {

  QuestionEditFormMode: typeof QuestionEditFormMode = QuestionEditFormMode;

  readonly exampleEssayQuestionModel: QuestionEditFormModel = {
    customNumberOfEntitiesToGiveFeedbackTo: 0,
    feedbackQuestionId: '',
    isEditable: false,
    isQuestionHasResponses: false,
    isSaving: false,
    questionNumber: 1,
    questionBrief: '',
    questionDescription: '',

    questionType: FeedbackQuestionType.TEXT,
    questionDetails: DEFAULT_TEXT_QUESTION_DETAILS(),

    giverType: FeedbackParticipantType.STUDENTS,
    recipientType: FeedbackParticipantType.OWN_TEAM_MEMBERS,

    numberOfEntitiesToGiveFeedbackToSetting: NumberOfEntitiesToGiveFeedbackToSetting.UNLIMITED,

    showResponsesTo: [FeedbackVisibilityType.INSTRUCTORS, FeedbackVisibilityType.RECIPIENT],
    showGiverNameTo: [FeedbackVisibilityType.INSTRUCTORS],
    showRecipientNameTo: [FeedbackVisibilityType.INSTRUCTORS, FeedbackVisibilityType.RECIPIENT],
  };

  isEssayQuestionsCollapsed: boolean = false;
  isMCQSingleAnsCollapsed: boolean = false;
  isMCQMultipleAnsCollapsed: boolean = false;
  isNumericalScaleCollapsed: boolean = false;
  isPointsOptionsCollapsed: boolean = false;
  isPointsRecipientsCollapsed: boolean = false;
  isContributionQsCollapsed: boolean = false;
  isRubricQsCollapsed: boolean = false;
  isRankOptionsCollapsed: boolean = false;
  isRankRecipientsCollapsed: boolean = false;
  @Output() collapsePeerEvalTips: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  /**
   * Opens modal window.
   */
  openModal(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit(): void {
  }

  /**
   * Scrolls to an HTML element with a given target id.
   */
  jumpTo(target: string): boolean {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: `#${target}`,
      scrollOffset: 70,
    });
    if (target === 'tips-for-conducting-peer-eval') {
      this.collapsePeerEvalTips.emit(true);
    }
    return false;
  }
}
