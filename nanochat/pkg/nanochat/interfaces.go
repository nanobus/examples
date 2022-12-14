// Code generated by @apexlang/codegen. DO NOT EDIT.

package nanochat

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/rx/mono"
)

type ns struct{}

func (n *ns) Namespace() string {
	return "nanochat.io.v1.jots"
}

// Jot API
type Jots interface {
	// Post a Tweet.
	PostJot(ctx context.Context, message string) mono.Mono[Jot]
	// Get the jot feed
	GetFeed(ctx context.Context, before *time.Time, limit uint32) mono.Mono[JotPage]
	// Get a tweet by id.
	GetJot(ctx context.Context, id uuid.UUID) mono.Mono[Jot]
	// Delete a tweet (only creator has access)
	DeleteJot(ctx context.Context, id uuid.UUID) mono.Mono[Jot]
	// Like a tweet
	Like(ctx context.Context, id uuid.UUID) mono.Void
	// Unlike a tweet
	Unlike(ctx context.Context, id uuid.UUID) mono.Void
	// Get the users that like a jot.
	Likes(ctx context.Context, id uuid.UUID, pagination *Pagination) mono.Mono[UserPage]
}

// Users API
type Users interface {
	Me(ctx context.Context) mono.Mono[User]
	// Get the user's profile
	GetProfile(ctx context.Context, handle string) mono.Mono[User]
	// Get the user's jots.
	GetJots(ctx context.Context, handle string, before *time.Time, limit uint32) mono.Mono[JotPage]
	// Follow a user
	Follow(ctx context.Context, handle string) mono.Void
	// Unfollow a user
	Unfollow(ctx context.Context, handle string) mono.Void
	// Get users the followed by the users
	GetFollows(ctx context.Context, handle string, pagination *Pagination) mono.Mono[UserPage]
	// Get followers of a user
	GetFollowers(ctx context.Context, handle string, pagination *Pagination) mono.Mono[UserPage]
}

// Jot entity
type Jot struct {
	ns
	// The dynamically generated ID.
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
	// The jot owner ID.
	UserID uuid.UUID `json:"userId" yaml:"userId" msgpack:"userId"`
	// The jot owner handle
	Handle string `json:"handle" yaml:"handle" msgpack:"handle"`
	// The message body.
	Message string `json:"message" yaml:"message" msgpack:"message"`
	// The time the tweet was entered.
	Time time.Time `json:"time" yaml:"time" msgpack:"time"`
	// The number of likes.
	Likes uint32 `json:"likes" yaml:"likes" msgpack:"likes"`
}

func (j *Jot) Type() string {
	return "Jot"
}

// Jot page
type JotPage struct {
	ns
	// Before timestamp
	Before *time.Time `json:"before,omitempty" yaml:"before,omitempty" msgpack:"before,omitempty"`
	// Limit result
	Limit uint32 `json:"limit" yaml:"limit" msgpack:"limit"`
	// The tweets returned
	Items []Jot `json:"items" yaml:"items" msgpack:"items"`
}

func (j *JotPage) Type() string {
	return "JotPage"
}

// User entity
type User struct {
	ns
	// User ID.
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
	// Handle.
	Handle string `json:"handle" yaml:"handle" msgpack:"handle"`
	// The number of followers
	Followers uint32 `json:"followers" yaml:"followers" msgpack:"followers"`
	// The number of users followed
	Follows uint32 `json:"follows" yaml:"follows" msgpack:"follows"`
	// If the authenticated user is following this user. Will return false if
	// unauthenticated or outside of Users::getProfile.
	IsFollowing bool `json:"isFollowing" yaml:"isFollowing" msgpack:"isFollowing"`
}

func (u *User) Type() string {
	return "User"
}

// User page
type UserPage struct {
	ns
	// Offet
	Offset uint32 `json:"offset" yaml:"offset" msgpack:"offset"`
	// Limit
	Limit uint32 `json:"limit" yaml:"limit" msgpack:"limit"`
	// The users returned
	Items []User `json:"items" yaml:"items" msgpack:"items"`
}

func (u *UserPage) Type() string {
	return "UserPage"
}

// Pagination query parameters
type Pagination struct {
	ns
	// Offset
	Offset uint32 `json:"offset" yaml:"offset" msgpack:"offset"`
	// Limit
	Limit uint32 `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (p *Pagination) Type() string {
	return "Pagination"
}