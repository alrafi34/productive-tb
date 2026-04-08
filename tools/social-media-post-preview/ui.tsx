"use client";

import { useState, useCallback } from "react";
import {
  PLATFORM_LIMITS,
  Platform,
  getPreviewData,
  extractHashtags,
  extractMentions,
  extractUrls,
  getCharacterCountColor,
  getProgressBarColor,
  getPlatformLabel,
} from "./logic";
import SocialMediaPostPreviewSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SocialMediaPostPreviewUI() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [username, setUsername] = useState("@yourbrand");
  const [profileName, setProfileName] = useState("Your Brand");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [postPhoto, setPostPhoto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const preview = getPreviewData(text, platform);
  const hashtags = extractHashtags(text);
  const mentions = extractMentions(text);
  const urls = extractUrls(text);

  const handleProfileImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfileImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handlePostPhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPostPhoto(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const renderTwitterPreview = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex gap-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg">
            👤
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{profileName}</span>
            <span className="text-gray-500 text-sm">{username}</span>
          </div>
          <p className="text-gray-900 mt-3 break-words whitespace-pre-wrap text-sm leading-normal">
            {text}
          </p>
          {postPhoto && (
            <img src={postPhoto} alt="Post" className="mt-3 rounded-lg max-w-xs" />
          )}
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex gap-3 mb-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            👤
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900 text-sm">{profileName}</div>
          <div className="text-gray-500 text-xs">Just now</div>
        </div>
      </div>
      <p className="text-gray-900 break-words whitespace-pre-wrap text-sm leading-relaxed">
        {text}
      </p>
      {postPhoto && (
        <img src={postPhoto} alt="Post" className="mt-4 rounded-lg w-full" />
      )}
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {postPhoto ? (
        <img src={postPhoto} alt="Post" className="w-full aspect-square object-cover" />
      ) : (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 aspect-square flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">📸</div>
            <div className="text-sm">Image placeholder</div>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
              👤
            </div>
          )}
          <span className="font-semibold text-sm text-gray-900">{profileName}</span>
        </div>
        <p className="text-gray-900 break-words whitespace-pre-wrap text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex gap-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              👤
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 text-sm">{profileName}</div>
            <div className="text-gray-500 text-xs">Just now</div>
          </div>
        </div>
      </div>
      {postPhoto && (
        <img src={postPhoto} alt="Post" className="w-full" />
      )}
      <div className="p-4">
        <p className="text-gray-900 break-words whitespace-pre-wrap text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write your post
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your social media post here..."
              rows={6}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
          </div>

          {/* Character Counter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">
                {preview.charCount} / {PLATFORM_LIMITS[platform]}
              </span>
              <span className={`text-xs font-semibold ${getCharacterCountColor(preview.remaining, PLATFORM_LIMITS[platform])}`}>
                {preview.isOverLimit
                  ? `${Math.abs(preview.remaining)} over limit`
                  : `${preview.remaining} remaining`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getProgressBarColor(preview.charCount, PLATFORM_LIMITS[platform])}`}
                style={{
                  width: `${Math.min((preview.charCount / PLATFORM_LIMITS[platform]) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Platform Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <div className="flex gap-2 flex-wrap">
              {(["twitter", "linkedin", "instagram", "facebook"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    platform === p
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {getPlatformLabel(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@yourbrand"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Your Brand"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image (optional)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleProfileImageUpload}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          {/* Post Photo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Photo (optional)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePostPhotoUpload}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {postPhoto && (
              <button
                onClick={() => setPostPhoto(null)}
                className="mt-2 text-xs text-red-600 hover:text-red-700"
              >
                Remove photo
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy Post"}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-5 py-2.5 border border-gray-200 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          {text ? (
            <>
              {platform === "twitter" && renderTwitterPreview()}
              {platform === "linkedin" && renderLinkedInPreview()}
              {platform === "instagram" && renderInstagramPreview()}
              {platform === "facebook" && renderFacebookPreview()}
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-sm">Start typing to preview your post</p>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        {text && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Post Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hashtags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">Hashtags ({hashtags.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {mentions.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">Mentions ({mentions.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {mentions.map((mention) => (
                      <span
                        key={mention}
                        className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded"
                      >
                        {mention}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {urls.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">URLs ({urls.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {urls.map((url) => (
                      <span
                        key={url}
                        className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded truncate max-w-xs"
                        title={url}
                      >
                        {url.length > 20 ? url.substring(0, 20) + "..." : url}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <SocialMediaPostPreviewSEOContent />

      <RelatedTools
        currentTool="social-media-post-preview"
        tools={["text-to-slug-converter", "word-counter", "paragraph-formatter"]}
      />
    </>
  );
}
