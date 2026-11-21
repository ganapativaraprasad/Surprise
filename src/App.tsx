import { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useSceneNavigation } from './hooks/useSceneNavigation';
import { useAudio } from './hooks/useAudio';
import { AudioPlayer } from './components/common/AudioPlayer';
import { ChapterIndicator } from './components/common/ChapterIndicator';
import { ModalPhotoView } from './components/common/ModalPhotoView';
import { birthdayPhotos, BirthdayPhoto } from './data/photos';

// All 11 Cinematic Scenes
import { Scene01_Invitation } from './scenes/Scene01_Invitation';
import { Scene02_Welcome } from './scenes/Scene02_Welcome';
import { Scene03_Childhood } from './scenes/Scene03_Childhood';
import { Scene04_GrowingUp } from './scenes/Scene04_GrowingUp';
import { Scene05_Family } from './scenes/Scene05_Family';
import { Scene06_Friends } from './scenes/Scene06_Friends';
import { Scene07_OurMemories } from './scenes/Scene07_OurMemories';
import { Scene08_SpecialMoments } from './scenes/Scene08_SpecialMoments';
import { Scene09_BirthdayLetter } from './scenes/Scene09_BirthdayLetter';
import { Scene10_CatchStarsGame } from './scenes/Scene10_CatchStarsGame';
const Scene11_FinalUniverse = lazy(() => import('./scenes/Scene11_FinalUniverse'));

export function App() {
  const {
    currentScene,
    scenes,
    goToScene,
    nextScene,
    prevScene,
    isUniverseMode,
  } = useSceneNavigation(0);

  // Hook receives currentScene and automatically switches tracks with looping!
  const {
    isPlaying,
    isMuted,
    volume,
    worldMode,
    currentTrackInfo,
    togglePlay,
    startMusic,
    toggleMute,
    setVolume,
    switchMode,
    playEnvelope,
    playStarCollect,
    playWaterDrop,
    playUniverseBurst,
  } = useAudio(currentScene);

  // Active selected photo for lightbox view
  const [selectedPhoto, setSelectedPhoto] = useState<BirthdayPhoto | null>(null);
  const sceneId = scenes[currentScene].id;
  const isDark = currentScene === 0 || currentScene >= 9;

  // Sync world mode with current scene
  useEffect(() => {
    if (isUniverseMode && worldMode !== 'universe') {
      switchMode('universe');
    } else if (!isUniverseMode && worldMode !== 'memory') {
      switchMode('memory');
    }
  }, [isUniverseMode, worldMode, switchMode]);

  const handleOpenInvitation = () => {
    startMusic();
    nextScene();
  };

  const handleUnlockUniverse = () => {
    playUniverseBurst();
    switchMode('universe');
    goToScene(10); // Scene 11: The Magical Universe
  };

  const playFinaleStar = useCallback(() => playStarCollect(4), [playStarCollect]);

  return (
    <div className="story" data-scene={sceneId} data-theme={isDark ? 'night' : 'paper'}>
      <header className="story-masthead">
        <div className="story-brand">
          <span className="story-emblem" aria-hidden="true"><Sparkles size={17} /></span>
          <span>Sabdha <i>22</i></span>
        </div>
        <AudioPlayer
          key={sceneId}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          currentTrack={currentTrackInfo}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onVolumeChange={setVolume}
        />
      </header>

      {/* Main Scene Content */}
      <main id="story-scene" className="story-scene relative w-full" tabIndex={-1}>
        {currentScene === 0 && (
          <Scene01_Invitation
            onOpenSurprise={handleOpenInvitation}
            onPlayEnvelopeSfx={playEnvelope}
          />
        )}

        {currentScene === 1 && (
          <Scene02_Welcome onStartJourney={() => goToScene(2)} />
        )}

        {currentScene === 2 && (
          <Scene03_Childhood
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(3)}
          />
        )}

        {currentScene === 3 && (
          <Scene04_GrowingUp
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(4)}
          />
        )}

        {currentScene === 4 && (
          <Scene05_Family
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(5)}
          />
        )}

        {currentScene === 5 && (
          <Scene06_Friends
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(6)}
          />
        )}

        {currentScene === 6 && (
          <Scene07_OurMemories
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(7)}
          />
        )}

        {currentScene === 7 && (
          <Scene08_SpecialMoments
            onSelectPhoto={setSelectedPhoto}
            onNextChapter={() => goToScene(8)}
          />
        )}

        {currentScene === 8 && (
          <Scene09_BirthdayLetter
            onPlayEnvelopeSfx={playEnvelope}
            onNextChapter={() => goToScene(9)}
            onSelectPhoto={setSelectedPhoto}
          />
        )}

        {currentScene === 9 && (
          <Scene10_CatchStarsGame
            onPlayStarCollectSfx={playStarCollect}
            onUnlockUniverse={handleUnlockUniverse}
            onSkipGame={() => goToScene(10)}
          />
        )}

        {currentScene === 10 && (
          <Suspense fallback={<div className="finale-page finale-loading" role="status">Opening the magical universe…</div>}>
            <Scene11_FinalUniverse
              onPlayWaterDropSfx={playWaterDrop}
              onPlayStarCollectSfx={playFinaleStar}
              onReplayJourney={() => goToScene(1)}
              onSelectPhoto={setSelectedPhoto}
            />
          </Suspense>
        )}
      </main>

      {/* Chapter Indicator Navigation (Scenes 1 through 10) */}
      <ChapterIndicator
        key={sceneId}
        currentScene={currentScene}
        scenes={scenes}
        onSelectScene={goToScene}
        onNext={nextScene}
        onPrev={prevScene}
      />

      {/* Full Size Photo Lightbox View with Next/Prev Navigation */}
      <ModalPhotoView
        photo={selectedPhoto}
        photoList={
          currentScene === 2
            ? birthdayPhotos.childhood
            : currentScene === 3
            ? birthdayPhotos.growingUp
            : currentScene === 4
            ? birthdayPhotos.family
            : currentScene === 5
            ? birthdayPhotos.friends
            : currentScene === 6
            ? birthdayPhotos.ourMemories
            : currentScene === 7
            ? birthdayPhotos.specialMoments
            : []
        }
        onSelectPhoto={setSelectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

export default App;
