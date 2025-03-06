/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The core pack schema that all packs must adhere to. This schema is extended by other schemas
 */
export interface Pack {
  /**
   * The pack schema version used
   */
  schema: "pre2";
  /**
   * The pack name
   */
  name: string;
  /**
   * The pack version, using semantic versioning conventions
   */
  version: string;
  /**
   * A short description of the pack's functionality
   */
  description: string;
  /**
   * The permissions requested for this pack from the host system
   */
  permissions: {
    /**
     * The environment variables this pack is allowed to access on the host system
     */
    environment?: string[];
    /**
     * Whether this pack can access the request and response body
     */
    body?: boolean;
  };
  /**
   * When a pack's excutable code is hosted remotely, this object describes how to download and verify it
   */
  url: {
    /**
     * A remote URL for downloading this Pack's executable code
     */
    source: string;
    /**
     * A sha-256 signature of the remote URL's content
     */
    signature: string;
  };
  /**
   * The user's configuration for this pack
   */
  configuration?: {
    [k: string]: unknown;
  };
}
