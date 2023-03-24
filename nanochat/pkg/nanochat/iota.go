// Code generated by @apexlang/codegen. DO NOT EDIT.

package nanochat

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/msgpack/convert"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

type JotsPostJotArgs struct {
	Message string `json:"message" yaml:"message" msgpack:"message"`
}

func (o *JotsPostJotArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "message":
			o.Message, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsPostJotArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("message")
	encoder.WriteString(o.Message)

	return nil
}

type JotsGetFeedArgs struct {
	Before *time.Time `json:"before,omitempty" yaml:"before,omitempty" msgpack:"before,omitempty"`
	Limit  uint32     `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (o *JotsGetFeedArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "before":
			o.Before, err = decoder.ReadNillableTime()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsGetFeedArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("before")
	encoder.WriteNillableTime(o.Before)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

type JotsGetJotArgs struct {
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
}

func (o *JotsGetJotArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsGetJotArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())

	return nil
}

type JotsDeleteJotArgs struct {
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
}

func (o *JotsDeleteJotArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsDeleteJotArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())

	return nil
}

type JotsLikeArgs struct {
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
}

func (o *JotsLikeArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsLikeArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())

	return nil
}

type JotsUnlikeArgs struct {
	ID uuid.UUID `json:"id" yaml:"id" msgpack:"id"`
}

func (o *JotsUnlikeArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsUnlikeArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())

	return nil
}

type JotsLikesArgs struct {
	ID         uuid.UUID  `json:"id" yaml:"id" msgpack:"id"`
	Pagination Pagination `json:"pagination" yaml:"pagination" msgpack:"pagination"`
}

func (o *JotsLikesArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "pagination":
			err = o.Pagination.Decode(decoder)
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotsLikesArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("pagination")
	o.Pagination.Encode(encoder)

	return nil
}

type UsersGetProfileArgs struct {
	Handle string `json:"handle" yaml:"handle" msgpack:"handle"`
}

func (o *UsersGetProfileArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersGetProfileArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)

	return nil
}

type UsersGetJotsArgs struct {
	Handle string     `json:"handle" yaml:"handle" msgpack:"handle"`
	Before *time.Time `json:"before,omitempty" yaml:"before,omitempty" msgpack:"before,omitempty"`
	Limit  uint32     `json:"limit" yaml:"limit" msgpack:"limit"`
}

func (o *UsersGetJotsArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		case "before":
			o.Before, err = decoder.ReadNillableTime()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersGetJotsArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)
	encoder.WriteString("before")
	encoder.WriteNillableTime(o.Before)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

type UsersFollowArgs struct {
	Handle string `json:"handle" yaml:"handle" msgpack:"handle"`
}

func (o *UsersFollowArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersFollowArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)

	return nil
}

type UsersUnfollowArgs struct {
	Handle string `json:"handle" yaml:"handle" msgpack:"handle"`
}

func (o *UsersUnfollowArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersUnfollowArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)

	return nil
}

type UsersGetFollowsArgs struct {
	Handle     string     `json:"handle" yaml:"handle" msgpack:"handle"`
	Pagination Pagination `json:"pagination" yaml:"pagination" msgpack:"pagination"`
}

func (o *UsersGetFollowsArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		case "pagination":
			err = o.Pagination.Decode(decoder)
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersGetFollowsArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)
	encoder.WriteString("pagination")
	o.Pagination.Encode(encoder)

	return nil
}

type UsersGetFollowersArgs struct {
	Handle     string     `json:"handle" yaml:"handle" msgpack:"handle"`
	Pagination Pagination `json:"pagination" yaml:"pagination" msgpack:"pagination"`
}

func (o *UsersGetFollowersArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "handle":
			o.Handle, err = decoder.ReadString()
		case "pagination":
			err = o.Pagination.Decode(decoder)
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UsersGetFollowersArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)
	encoder.WriteString("pagination")
	o.Pagination.Encode(encoder)

	return nil
}

func (o *Jot) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "userId":
			o.UserID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "handle":
			o.Handle, err = decoder.ReadString()
		case "message":
			o.Message, err = decoder.ReadString()
		case "time":
			o.Time, err = decoder.ReadTime()
		case "likes":
			o.Likes, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *Jot) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(6)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("userId")
	encoder.WriteString(o.UserID.String())
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)
	encoder.WriteString("message")
	encoder.WriteString(o.Message)
	encoder.WriteString("time")
	encoder.WriteTime(o.Time)
	encoder.WriteString("likes")
	encoder.WriteUint32(o.Likes)

	return nil
}

func (o *JotPage) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "before":
			o.Before, err = decoder.ReadNillableTime()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		case "items":
			listSize, err := decoder.ReadArraySize()
			if err != nil {
				return err
			}
			o.Items = make([]Jot, 0, listSize)
			for listSize > 0 {
				listSize--
				var nonNilItem Jot
				err = nonNilItem.Decode(decoder)
				if err != nil {
					return err
				}
				o.Items = append(o.Items, nonNilItem)
			}
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *JotPage) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("before")
	encoder.WriteNillableTime(o.Before)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)
	encoder.WriteString("items")
	encoder.WriteArraySize(uint32(len(o.Items)))
	for _, v := range o.Items {
		v.Encode(encoder)
	}

	return nil
}

func (o *User) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = convert.Parse(uuid.Parse)(decoder.ReadString())
		case "handle":
			o.Handle, err = decoder.ReadString()
		case "followers":
			o.Followers, err = decoder.ReadUint32()
		case "follows":
			o.Follows, err = decoder.ReadUint32()
		case "isFollowing":
			o.IsFollowing, err = decoder.ReadBool()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *User) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(5)
	encoder.WriteString("id")
	encoder.WriteString(o.ID.String())
	encoder.WriteString("handle")
	encoder.WriteString(o.Handle)
	encoder.WriteString("followers")
	encoder.WriteUint32(o.Followers)
	encoder.WriteString("follows")
	encoder.WriteUint32(o.Follows)
	encoder.WriteString("isFollowing")
	encoder.WriteBool(o.IsFollowing)

	return nil
}

func (o *UserPage) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "offset":
			o.Offset, err = decoder.ReadUint32()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		case "items":
			listSize, err := decoder.ReadArraySize()
			if err != nil {
				return err
			}
			o.Items = make([]User, 0, listSize)
			for listSize > 0 {
				listSize--
				var nonNilItem User
				err = nonNilItem.Decode(decoder)
				if err != nil {
					return err
				}
				o.Items = append(o.Items, nonNilItem)
			}
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *UserPage) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(3)
	encoder.WriteString("offset")
	encoder.WriteUint32(o.Offset)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)
	encoder.WriteString("items")
	encoder.WriteArraySize(uint32(len(o.Items)))
	for _, v := range o.Items {
		v.Encode(encoder)
	}

	return nil
}

func (o *Pagination) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "offset":
			o.Offset, err = decoder.ReadUint32()
		case "limit":
			o.Limit, err = decoder.ReadUint32()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *Pagination) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("offset")
	encoder.WriteUint32(o.Offset)
	encoder.WriteString("limit")
	encoder.WriteUint32(o.Limit)

	return nil
}

func RegisterJots(svc Jots) {
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "postJot", jotsPostJotWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "getFeed", jotsGetFeedWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "getJot", jotsGetJotWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "deleteJot", jotsDeleteJotWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "like", jotsLikeWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "unlike", jotsUnlikeWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Jots", "likes", jotsLikesWrapper(svc))
}

func RegisterUsers(svc Users) {
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "me", usersMeWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "getProfile", usersGetProfileWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "getJots", usersGetJotsWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "follow", usersFollowWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "unfollow", usersUnfollowWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "getFollows", usersGetFollowsWrapper(svc))
	invoke.ExportRequestResponse("nanochat.io.v1.jots.Users", "getFollowers", usersGetFollowersWrapper(svc))
}

func jotsPostJotWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsPostJotArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.PostJot(ctx, inputArgs.Message)
		return mono.Map(response, transform.MsgPackEncode[Jot])
	}
}

func jotsGetFeedWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsGetFeedArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetFeed(ctx, inputArgs.Before, inputArgs.Limit)
		return mono.Map(response, transform.MsgPackEncode[JotPage])
	}
}

func jotsGetJotWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsGetJotArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetJot(ctx, inputArgs.ID)
		return mono.Map(response, transform.MsgPackEncode[Jot])
	}
}

func jotsDeleteJotWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsDeleteJotArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.DeleteJot(ctx, inputArgs.ID)
		return mono.Map(response, transform.MsgPackEncode[Jot])
	}
}

func jotsLikeWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsLikeArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Like(ctx, inputArgs.ID)
		return mono.Map(response, transform.Void.Encode)
	}
}

func jotsUnlikeWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsUnlikeArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Unlike(ctx, inputArgs.ID)
		return mono.Map(response, transform.Void.Encode)
	}
}

func jotsLikesWrapper(svc Jots) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs JotsLikesArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Likes(ctx, inputArgs.ID, &inputArgs.Pagination)
		return mono.Map(response, transform.MsgPackEncode[UserPage])
	}
}

func usersMeWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		response := svc.Me(ctx)
		return mono.Map(response, transform.MsgPackEncode[User])
	}
}

func usersGetProfileWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersGetProfileArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetProfile(ctx, inputArgs.Handle)
		return mono.Map(response, transform.MsgPackEncode[User])
	}
}

func usersGetJotsWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersGetJotsArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetJots(ctx, inputArgs.Handle, inputArgs.Before, inputArgs.Limit)
		return mono.Map(response, transform.MsgPackEncode[JotPage])
	}
}

func usersFollowWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersFollowArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Follow(ctx, inputArgs.Handle)
		return mono.Map(response, transform.Void.Encode)
	}
}

func usersUnfollowWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersUnfollowArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Unfollow(ctx, inputArgs.Handle)
		return mono.Map(response, transform.Void.Encode)
	}
}

func usersGetFollowsWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersGetFollowsArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetFollows(ctx, inputArgs.Handle, &inputArgs.Pagination)
		return mono.Map(response, transform.MsgPackEncode[UserPage])
	}
}

func usersGetFollowersWrapper(svc Users) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs UsersGetFollowersArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.GetFollowers(ctx, inputArgs.Handle, &inputArgs.Pagination)
		return mono.Map(response, transform.MsgPackEncode[UserPage])
	}
}

var (
	gCaller invoke.Caller
)

func Initialize(caller invoke.Caller) {
	gCaller = caller
}