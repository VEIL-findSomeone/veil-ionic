'use client';

import axios from 'axios';
import React, { useState, useTransition } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonTextarea,
  IonNote,
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { close, add } from 'ionicons/icons';
import './ProfileEdit.scss';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { addUserInfo } from '@/app/tabs/UserProfile/ProfileEdit/action';
import UploadImage from '@/app/tabs/UserProfile/ProfileEdit/UploadImage';

const formSchema = z.object({
  name: z.string(),
  job_status: z.string(),
  field: z.string(),
  mbti: z.string(),
  self_description: z.string(),
  region1: z.string(),
  region2: z.string(),
});
type FormData = z.infer<typeof formSchema>;

type Props = {
  user: any;
  onClose: () => void;
};

const ProfileEdit: React.FC<Props> = ({ user, onClose }) => {
  const [segmentView, setSegmentView] = useState<string>('EDIT');
  const [imageUrl, setImageUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || '',
      job_status: user.job_status || '',
      field: user.field || '',
      mbti: user.mbti || '',
      self_description: user.self_description || '반갑습니다',
      region1: user.region || '',
      region2: user.region || '',
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 파일이 선택되었을 때 호출되는 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('입력된 정보: ', data);
    startTransition(async () => {
      try {
        const response = await axios.post('/api/profile/edit', { data });
        console.log(response.data); // 성공 응답 처리
        alert('User created successfully');
      } catch (error) {
        console.error(error);
        alert('Error creating user');
      }
      // const result = await addUserInfo(data);
      // const { error } = JSON.parse(result);
      // if (!error?.message) {
      //   console.log(data.mbti, data.region1, '저장 완료');
      //
      //   form.reset();
      // }
    });

    form.reset();
  };

  return (
    <>
      <IonHeader className="header-custom">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton type="submit" form="userInfo" color="primary" onClick={onClose}>
              나가기
            </IonButton>
          </IonButtons>
          <IonTitle>프로필 수정</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" form="userInfo" color="primary">
              저장
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className="toolbar-no-border">
          <IonSegment
            className="segment-custom"
            value={segmentView}
            onIonChange={e => setSegmentView(e.detail.value as string)}
            mode="md"
          >
            <IonSegmentButton value="EDIT">
              <IonLabel>수정</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="PREVIEW">
              <IonLabel>미리보기</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-edit-page bg-light">
        <form id="userInfo" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="full-height">
            {segmentView === 'EDIT' && (
              <div className="segment-view">
                <div className="photos-edit">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4" className="photo-item">
                        <div
                          className="photo-image background-img"
                          style={{ backgroundImage: 'url(/avatar/1.jpg)' }}
                        />
                        <div className="photo-button">
                          <IonIcon icon={close} />
                        </div>
                      </IonCol>
                      <IonCol size="4" className="photo-item">
                        <div
                          className="photo-image background-img"
                          style={{ backgroundImage: 'url(/avatar/1.jpg)' }}
                        />
                        <div className="photo-button">
                          <IonIcon icon={close} />
                        </div>
                      </IonCol>
                      <IonCol size="4" className="photo-item">
                        <div
                          className="photo-image background-img"
                          style={{ backgroundImage: 'url(/avatar/1.jpg)' }}
                        />
                        <div className="photo-button">
                          <IonIcon icon={close} />
                        </div>
                      </IonCol>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <IonCol size="4" className="photo-item no-photo" key={i}>
                          <div className="photo-image background-img" />
                          <div className="photo-button photo-button-invert">
                            <IonIcon icon={add} />
                          </div>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </div>
                <UploadImage />
                <IonList className="list-custom">
                  <IonListHeader>
                    <IonLabel>본인소개 (300자 제한)</IonLabel>
                  </IonListHeader>
                  <Controller
                    control={form.control}
                    name="self_description"
                    rules={{ required: true, maxLength: 300 }} // 필요한 경우 유효성 검사 규칙 추가
                    render={({ field, fieldState }) => (
                      <>
                        <IonItem lines="none">
                          <IonTextarea
                            rows={3}
                            {...field} // `Controller`로부터 받은 field 메소드와 속성을 사용
                            onIonChange={e => field.onChange(e.detail.value)}
                          />
                        </IonItem>
                        {fieldState.error && (
                          <IonText color="danger">본인소개는 300자를 넘을 수 없습니다.</IonText>
                        )}
                        <IonItem lines="none">
                          <IonNote slot="end">{field.value?.length || 0}/300</IonNote>
                        </IonItem>
                      </>
                    )}
                  />
                </IonList>
                <IonList className="list-custom">
                  <Controller
                    control={form.control}
                    name="region1"
                    render={({ field }) => (
                      <IonItem lines="none">
                        <IonLabel>
                          <div className="text-xl">
                            <IonText color="">활동지역1</IonText>
                          </div>
                        </IonLabel>

                        <IonSelect
                          onIonChange={e => field.onChange(e.detail.value)}
                          value={field.value}
                          placeholder="사는곳 고르기1"
                        >
                          <IonSelectOption value="서울">서울</IonSelectOption>
                          <IonSelectOption value="경기">경기</IonSelectOption>
                          <IonSelectOption value="인천">인천</IonSelectOption>
                          <IonSelectOption value="대전">대전</IonSelectOption>
                          <IonSelectOption value="대구">대구</IonSelectOption>
                          <IonSelectOption value="부산">부산</IonSelectOption>
                          <IonSelectOption value="울산">울산</IonSelectOption>
                          <IonSelectOption value="세종">세종</IonSelectOption>
                          <IonSelectOption value="충북">광주</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="region2"
                    render={({ field }) => (
                      <IonItem lines="none">
                        <IonLabel>
                          <div className="text-xl">
                            <IonText color="">활동지역2</IonText>
                          </div>
                        </IonLabel>

                        <IonSelect
                          onIonChange={e => field.onChange(e.detail.value)}
                          value={field.value}
                          placeholder="사는곳 고르기2"
                        >
                          <IonSelectOption value="서울">서울</IonSelectOption>
                          <IonSelectOption value="경기">경기</IonSelectOption>
                          <IonSelectOption value="인천">인천</IonSelectOption>
                          <IonSelectOption value="대전">대전</IonSelectOption>
                          <IonSelectOption value="대구">대구</IonSelectOption>
                          <IonSelectOption value="부산">부산</IonSelectOption>
                          <IonSelectOption value="울산">울산</IonSelectOption>
                          <IonSelectOption value="세종">세종</IonSelectOption>
                          <IonSelectOption value="충북">광주</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="job_status"
                    render={({ field }) => (
                      <IonItem lines="none">
                        <IonLabel>
                          <div className="text-xl">
                            <IonText color="">상태</IonText>
                          </div>
                        </IonLabel>

                        <IonSelect
                          onIonChange={e => field.onChange(e.detail.value)}
                          value={field.value}
                          placeholder="현재 상태 고르기"
                        >
                          <IonSelectOption value="직장인">직장인</IonSelectOption>
                          <IonSelectOption value="사업자">사업자</IonSelectOption>
                          <IonSelectOption value="학생">학생</IonSelectOption>
                          <IonSelectOption value="고민중">고민중</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <IonItem lines="none">
                        <IonLabel>
                          <div className="text-xl">
                            <IonText color="">분야</IonText>
                          </div>
                        </IonLabel>

                        <IonSelect
                          onIonChange={e => field.onChange(e.detail.value)}
                          value={field.value}
                          placeholder="관심분야 고르기"
                        >
                          <IonSelectOption value="예술">예술</IonSelectOption>
                          <IonSelectOption value="공학">공학</IonSelectOption>
                          <IonSelectOption value="체육">체육</IonSelectOption>
                          <IonSelectOption value="사업">사업</IonSelectOption>
                          <IonSelectOption value="교육">교육</IonSelectOption>
                          <IonSelectOption value="요식">요식</IonSelectOption>
                          <IonSelectOption value="고민중">고민중</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="mbti"
                    render={({ field }) => (
                      <IonItem lines="none">
                        <IonLabel>
                          <div className="text-xl">
                            <IonText color="">MBTI</IonText>
                          </div>
                        </IonLabel>

                        <IonSelect
                          onIonChange={e => field.onChange(e.detail.value)}
                          value={field.value}
                          placeholder="MBTI 고르기"
                        >
                          <IonSelectOption value="ISTJ">ISTJ</IonSelectOption>
                          <IonSelectOption value="ISFJ">ISFJ</IonSelectOption>
                          <IonSelectOption value="INFJ">INFJ</IonSelectOption>
                          <IonSelectOption value="INTJ">INTJ</IonSelectOption>
                          <IonSelectOption value="ISTP">ISTP</IonSelectOption>
                          <IonSelectOption value="ISFP">ISFP</IonSelectOption>
                          <IonSelectOption value="INFP">INFP</IonSelectOption>
                          <IonSelectOption value="INTP">INTP</IonSelectOption>
                          <IonSelectOption value="ESTP">ESTP</IonSelectOption>
                          <IonSelectOption value="ESFP">ESFP</IonSelectOption>
                          <IonSelectOption value="ENFP">ENFP</IonSelectOption>
                          <IonSelectOption value="ENTP">ENTP</IonSelectOption>
                          <IonSelectOption value="ESTJ">ESTJ</IonSelectOption>
                          <IonSelectOption value="ESFJ">ESFJ</IonSelectOption>
                          <IonSelectOption value="ENFJ">ENFJ</IonSelectOption>
                          <IonSelectOption value="ENTJ">ENTJ</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    )}
                  />

                  <IonListHeader>
                    <IonLabel>성별</IonLabel>
                  </IonListHeader>
                  <IonItem lines="none">
                    <IonLabel>남자</IonLabel>
                  </IonItem>
                </IonList>
              </div>
            )}
            {segmentView === 'PREVIEW' && (
              <>
                <span>제공예정</span>
              </>
            )}
          </div>
        </form>
      </IonContent>
    </>
  );
};

ProfileEdit.defaultProps = {};

export default ProfileEdit;
